import './style/index.css';
import createDebug from 'debug';
import { expose } from './global';
import settings from '../settings/browser';
import createRenderer from './renderer/browser';
import DataTree from './data/tree';
import createActions from './action';
import createRedux from './redux';
import createRoutes from './route';
import createRouter from './router';
let router;

const debug = createDebug('browser');
debug('starting bootstrap');

function getData(id) {
  const json = (document.getElementById(id) || {}).textContent;
  return json ? JSON.parse(json) : {};
}

global.addEventListener('popstate', () =>
  router.setUrl(location.pathname));

const initialState = DataTree.fromServerData(getData('data')); // eslint-disable-line new-cap
const element = document.getElementById('root');
const renderer = createRenderer(element, settings);
const renderServices = {};
const actions = createActions(() => router);
const { store, boundActions } = createRedux(initialState, actions, state => {
  expose('lastState', state);
  renderer(state, boundActions, renderServices);
}, settings);

router = createRouter(createRoutes(boundActions, settings),
  (url, title) => global.history.pushState(null, title, url));

expose('lastState', initialState);
expose('renderer', renderer);
expose('store', store);
expose('actions', actions);
expose('router', router);
debug('bootstrap done');

renderServices.getUrl = router.getUrl.bind(router);
renderer(initialState, boundActions, renderServices);
