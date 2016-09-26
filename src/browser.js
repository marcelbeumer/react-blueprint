import 'babel-polyfill';
import './style/index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import createDebug from 'debug';
import { expose } from './global';
import DataTree from './data/tree';
import createStore from './store';
import RootComponent from './component';
// import createRouter from '../router';

const debug = createDebug('browser');
debug('starting bootstrap');

global.onunhandledrejection = ({ reason }) =>
  console.error(reason.stack || reason); // eslint-disable-line no-console

function render(store, element) {
  ReactDOM.render(<RootComponent store={store} />, element);
}

function getData(id) {
  const json = (document.getElementById(id) || {}).textContent;
  return json ? JSON.parse(json) : {};
}

const initialState = DataTree.fromServerData(getData('data')); // eslint-disable-line new-cap
const element = document.getElementById('root');

// const actionServices = {};
// const renderServices = {};
// const routeServices = {};

const store = createStore(initialState);
// routeServices.setScreen = store.actions.setScreen;

// const router = createRouter(routeServices, initialUrl, (url) => {
//   if (historySupport && location.pathname !== url) {
//     history.pushState('', document.title, url);
//   }
// });
//
// actionServices.setUrl = router.setUrl.bind(router);
// renderServices.getUrl = router.getUrl.bind(router);
//
// if (historySupport) {
//   global.addEventListener('popstate', () => {
//     router.setUrl(location.pathname);
//   });
// }

render(store, element);
//
// if (element.querySelector('[data-react-checksum]')) {
//   render(store, initialState);
// } else {
//   router.runUrl(initialUrl);
// }

expose('render', render.bind(null, store, element));
expose('store', store);
// expose('router', router);
debug('bootstrap done');
