import 'babel-polyfill';
import './style/index.css';
import Perf from 'react-addons-perf';
import React from 'react';
import ReactDOM from 'react-dom';
import DataTree from './data/tree';
import createStore from './store';
import * as actions from './store/action';
import RootComponent from './component';
import BrowserRouter from './router/BrowserRouter';
import routes from './routes';

global.React = React;
global.ReactPerf = Perf;
global.onunhandledrejection = ({ reason }) =>
  console.error(reason.stack || reason); // eslint-disable-line no-console

function render(store, services, element) {
  ReactDOM.render(<RootComponent store={store} services={services} />, element);
}

function getData(id) {
  const json = (document.getElementById(id) || {}).textContent;
  return json ? JSON.parse(json) : {};
}

const routeServices = {};
const renderServices = {};
const initialState = DataTree.fromServerData(getData('data')); // eslint-disable-line new-cap
const element = document.getElementById('root');
const store = createStore(initialState);
const router = new BrowserRouter(routes(routeServices));
const setScreen = (value) => store.dispatch(actions.setScreen(value));
const setUrl = router.setUrl.bind(router);
const getUrl = router.getUrl.bind(router);

Object.assign(routeServices, { setScreen });
Object.assign(renderServices, { setUrl, getUrl });

if (!element.querySelector('[data-react-checksum]')) {
  router.runUrl(router.url);
}

router.startListening();
render(store, renderServices, element);
