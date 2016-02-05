import './style/index.css';
import createDebug from 'debug';
import settings from '../settings/browser';
import createRenderer from './renderer';
import DataTree from './data/tree';
import createRedux from './redux';

const debug = createDebug('browser');
debug('starting bootstrap');
const element = document.getElementById('root');
const state = new DataTree();
const renderer = createRenderer(element, settings);
const actions = createRedux(renderer, state, settings);
debug('app ready');
renderer(state, actions);
