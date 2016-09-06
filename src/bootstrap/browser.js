import 'babel-polyfill';
import createDebug from 'debug';
import '../style/index.css';
import { expose } from '../global';
import createRenderer from '../renderer/browser';
import DataTree from '../data/tree';
import createReduxStore from '../redux';
import createRxJsStore from '../rxjs';
import createRoutes from '../route';
import Router from '../router';

export default function bootstrap({ historySupport = false, initialUrl = '/' } = {}) {
  const debug = createDebug('browser');
  debug('starting bootstrap');

  global.onunhandledrejection = ({ reason }) =>
    console.error(reason.stack || reason); // eslint-disable-line no-console

  function getData(id) {
    const json = (document.getElementById(id) || {}).textContent;
    return json ? JSON.parse(json) : {};
  }

  const initialState = DataTree.fromServerData(getData('data')); // eslint-disable-line new-cap
  const element = document.getElementById('root');
  const renderer = createRenderer(element);
  const actionServices = {};
  const renderServices = {};
  const routeServices = {};
  let store;
  let router;

  function createRedux(state) {
    store = createReduxStore(state, actionServices, updatedState =>
      renderer(updatedState, store.actions, renderServices));
    routeServices.setScreen = store.actions.setScreen;
  }

  function createRxJs(state) {
    store = createRxJsStore(state, actionServices);
    store.state.skip(1).subscribe(updatedState =>
      renderer(updatedState, store.actions, renderServices));
    routeServices.setScreen = store.actions.setScreen;
  }

  function createStore(storeType) {
    const state = (store ? store.getState() : initialState).set('store', storeType);
    if (storeType === 'rxjs') {
      createRxJs(state);
    } else {
      createRedux(state);
    }
    expose('store', store);
  }

  createStore(initialState.get('store'));
  actionServices.setStore = value => createStore(value);

  router = new Router(createRoutes(routeServices), initialUrl, (url) => { // eslint-disable-line prefer-const, max-len
    if (historySupport && location.pathname !== url) {
      history.pushState('', document.title, url);
    }
  });

  actionServices.setUrl = router.setUrl.bind(router);
  renderServices.getUrl = router.getUrl.bind(router);

  if (historySupport) {
    global.addEventListener('popstate', () => {
      router.setUrl(location.pathname);
    });
  }

  if (element.querySelector('[data-react-checksum]')) {
    renderer(initialState, store.actions, renderServices);
  } else {
    router.runUrl(initialUrl);
  }

  expose('renderer', renderer);
  expose('router', router);
  debug('bootstrap done');
}
