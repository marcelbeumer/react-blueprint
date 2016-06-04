/* eslint no-console:0 */
import 'babel-polyfill';
import './style/index.css';
import createDebug from 'debug';
import { expose } from './global';
import createRenderer from './renderer/browser';
import DataTree from './data/tree';
import createReduxStore from './redux';
import createRxJsStore from './rxjs';
import createRoutes from './route';
import Router from './router';
import { skip } from 'rxjs/operator/skip';

const debug = createDebug('browser');
debug('starting bootstrap');

global.onunhandledrejection = ({ reason }) =>
  console.error(reason.stack || reason);

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

function createRedux() {
  store = createReduxStore(initialState, actionServices, state =>
    renderer(state, store.actions, renderServices));
  routeServices.setScreen = store.actions.setScreen;
}

function createRxJs() {
  store = createRxJsStore(initialState, actionServices);
  store.state::skip(1).subscribe(updatedState =>
   renderer(updatedState, store.actions, renderServices));
  routeServices.setScreen = store.actions.setScreen;
}

function createStore(storeType) {
  if (storeType === 'rxjs') {
    createRxJs();
  } else {
    createRedux();
  }
  expose('store', store);
}

createStore(initialState.get('store'));
actionServices.setStore = value => createStore(value);

router = new Router(createRoutes(routeServices), location.pathname, // eslint-disable-line prefer-const, max-len
  url => location.pathname !== url && history.pushState('', document.title, url));

actionServices.setUrl = router.setUrl.bind(router);
renderServices.getUrl = router.getUrl.bind(router);
global.addEventListener('popstate', () => router.setUrl(location.pathname));

if (element.querySelector('[data-react-checksum]')) {
  renderer(initialState, store.actions, renderServices);
} else {
  router.runUrl(location.pathname);
}

expose('renderer', renderer);
expose('router', router);
debug('bootstrap done');
