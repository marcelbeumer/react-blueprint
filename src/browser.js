import './index.css';
import settings from '../settings/browser';
import createDebug from './debug';
import createRenderer from './renderer';
import DataTree from './data/tree';
import createRedux from './redux';

const element = document.getElementById('root');
const state = new DataTree();
const debug = createDebug(window, console);
const renderer = createRenderer(element, debug, settings);
const actions = createRedux(renderer, state, debug, settings);
renderer(state, actions);
