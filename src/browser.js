import './style/index.css';
import createDebug from 'debug';
import { expose } from './global';
import settings from '../settings/browser';
import createRenderer from './renderer/browser';
import createHistory from './history/browser';
import DataTree from './data/tree';
import createActions from './action';
import createRedux from './redux';
import createRoutes from './route';
import createRouter from './router';

function getData(id) {
  const json = (document.getElementById(id) || {}).textContent;
  return json ? JSON.parse(json) : {};
}

const debug = createDebug('browser');
debug('starting bootstrap');

const history = createHistory();
const element = document.getElementById('root');
const initialState = DataTree.fromServerData(getData('data')); // eslint-disable-line new-cap
const renderer = createRenderer(element, settings);
const actions = createActions(history);

const { store, boundActions } = createRedux(initialState, actions, state => {
  expose('lastState', state);
  renderer(state, boundActions);
}, settings);

const routes = createRoutes(boundActions, settings);
const router = createRouter(routes);

history.setLocationHandler(router.handle.bind(router));
history.initPopState();

expose('lastState', initialState);
expose('renderer', renderer);
expose('store', store);
expose('actions', actions);
expose('routes', routes);
expose('router', router);
expose('history', history);
debug('bootstrap done');

renderer(initialState, boundActions);
