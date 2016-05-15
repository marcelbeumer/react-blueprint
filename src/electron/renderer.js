/* eslint no-console:0 */
import 'babel-polyfill';
import '../style/index.css';
import createDebug from 'debug';
import { expose } from '../global';
import createRenderer from '../renderer/browser';
import DataTree from '../data/tree';
import createActions from '../action';
import createRedux from '../redux';
import createRoutes from '../route';
import Router from '../router';

let router; // eslint-disable-line prefer-const
const debug = createDebug('electron');
debug('starting bootstrap');

global.onunhandledrejection = ({ reason }) =>
  console.error(reason.stack || reason);

const initialState = new DataTree();
const element = document.getElementById('root');
const renderer = createRenderer(element);
const renderServices = {};
const actions = createActions(() => router);
const { store, boundActions } = createRedux(initialState, actions, state =>
  renderer(state, boundActions, renderServices));

router = new Router(createRoutes(store, actions), location.pathname); // eslint-disable-line prefer-const, max-len

expose('renderer', renderer);
expose('store', store);
expose('actions', actions);
expose('boundActions', boundActions);
expose('router', router);
debug('bootstrap done');

renderServices.getUrl = router.getUrl.bind(router);
router.runUrl('/');
