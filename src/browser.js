/* eslint no-console:0 */
import './style/index.css';
import createDebug from 'debug';
import { expose } from './global';
import createRenderer from './renderer/browser';
import DataTree from './data/tree';
import createActions from './action';
import createRedux from './redux';
import createRoutes from './route';
import Router from './router';

let router;
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
const renderServices = {};
const actions = createActions(() => router);
const { store, boundActions } = createRedux(initialState, actions, state =>
  renderer(state, boundActions, renderServices));

router = new Router(createRoutes(store, actions), location.pathname,
  url => location.pathname !== url && history.pushState('', document.title, url));

expose('renderer', renderer);
expose('store', store);
expose('actions', actions);
expose('boundActions', boundActions);
expose('router', router);
debug('bootstrap done');

global.addEventListener('popstate', () => router.setUrl(location.pathname));
renderServices.getUrl = router.getUrl.bind(router);

if (element.querySelector('[data-react-checksum]')) {
  renderer(initialState, boundActions, renderServices);
} else {
  router.runUrl(location.pathname);
}
