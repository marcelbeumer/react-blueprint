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

function setLocation(title, location) {
  global.history.pushState(null, title, location);
  router.route(location);
}

const element = document.getElementById('root');
const initialState = DataTree.fromServerData(getData('data')); // eslint-disable-line new-cap
const renderer = createRenderer(element, settings);
const actions = createActions(setLocation);

const { store, boundActions } = createRedux(initialState, actions, state => {
  expose('lastState', state);
  renderer(state, boundActions, router.getUrl);
}, settings);

router = createRouter(createRoutes(boundActions, settings));
global.addEventListener('popstate', () =>
  router.route(location.pathname));

expose('lastState', initialState);
expose('renderer', renderer);
expose('store', store);
expose('actions', actions);
expose('router', router);
debug('bootstrap done');

renderer(initialState, boundActions, router.getUrl);
