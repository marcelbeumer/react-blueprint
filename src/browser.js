import './style/index.css';
import createDebug from 'debug';
import { expose } from './global';
import createRenderer from './renderer/browser';
import DataTree from './data/tree';
import createActions from './action';
import createRedux from './redux';
import createRoutes from './route';
import { StatefulRouter } from './router';

let router;

const debug = createDebug('browser');
debug('starting bootstrap');

function getData(id) {
  const json = (document.getElementById(id) || {}).textContent;
  return json ? JSON.parse(json) : {};
}

// workaround for hosting on sub paths
function getUrl() {
  return `/${location.pathname.split('/').pop()}`;
}

// workaround for hosting on sub paths
function toPathname(url) {
  const base = location.pathname.split('/');
  base.pop();
  return base.join('/') + url;
}

const initialState = DataTree.fromServerData(getData('data')); // eslint-disable-line new-cap
const element = document.getElementById('root');
const renderer = createRenderer(element);
const renderServices = {};
const actions = createActions(() => router);
const { store, boundActions } = createRedux(initialState, actions, state =>
  renderer(state, boundActions, renderServices));

router = new StatefulRouter(createRoutes(boundActions), getUrl(),
  (url, title) => getUrl() !== url && history.pushState('', title, toPathname(url)));

global.addEventListener('popstate', () => router.setUrl(getUrl()));

expose('renderer', renderer);
expose('store', store);
expose('actions', actions);
expose('router', router);
debug('bootstrap done');

renderServices.getUrl = router.getUrl.bind(router);
renderer(initialState, boundActions, renderServices);
