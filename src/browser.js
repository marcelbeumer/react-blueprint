import './style/index.css';
import createDebug from 'debug';
import { expose } from './global';
import settings from '../settings/browser';
import createRenderer from './renderer';
import DataTree from './data/tree';
import createRedux from './redux';

const debug = createDebug('browser');
debug('starting bootstrap');

const element = document.getElementById('root');
const initialState = new DataTree();
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
