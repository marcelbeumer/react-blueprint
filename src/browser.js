import createDebug from 'debug';
import { expose } from './global';
import settings from '../settings/browser';
import createRenderer from './renderer/browser';
import DataTree from './data/tree';
import createRedux from './redux';

require('./style/index.css');
require('./style/index.foobar2000');

function getData(id) {
  const json = (document.getElementById(id) || {}).textContent;
  return json ? JSON.parse(json) : {};
}

const debug = createDebug('browser');
debug('starting bootstrap');

const element = document.getElementById('root');
const initialState = DataTree.fromServerData(getData('data')); // eslint-disable-line new-cap
const renderer = createRenderer(element, settings);
const { store, actions } = createRedux(initialState, state => {
  expose('lastState', state);
  renderer(state, actions);
}, settings);

expose('lastState', initialState);
expose('renderer', renderer);
expose('store', store);
expose('actions', actions);

debug('bootstrap done');
renderer(initialState, actions);
