/* eslint no-console:0 */
import express from 'express';
import createDebug from 'debug';
import memoize from 'lodash/memoize';
import fs from 'fs';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import CleanCSS from 'clean-css';
import settings from '../settings/server';
import DataTree from './data/tree';
import createRenderer from './renderer/server';
import createActions from './action';
import createRedux from './redux';
import createRoutes from './route';
import Router from './router';
import { getCss } from './component/styles';
import env from 'node-env';

process.on('unhandledRejection', value =>
  console.error(value.stack || value));

const prod = env === 'production';
const debug = createDebug('server');
debug('starting server');

const renderer = createRenderer(settings);
const app = express();

const getTemplate = memoize(() =>
  String(fs.readFileSync(`${__dirname}/../dist/index.html`)));

const injectData = (output, data) =>
  output.replace(/(id=(['"]?)data\2>)/, `$1${JSON.stringify(data, null, prod ? 0 : 2)}`);

const injectRender = (output, render) =>
  output.replace(/(id=(['"]?)root\2>)/, `$1${render}`);

export function getComponentCss() {
  const source = getCss({ pretty: !prod });
  const css = String(postcss([autoprefixer]).process(source));
  return prod ? new CleanCSS().minify(css).styles : css;
}

export function renderApp(location) {
  let router;

  const renderServices = {};
  const initialState = new DataTree();
  const actions = createActions(() => router);

  const { store, boundActions } = createRedux(initialState, actions);
  router = new Router(createRoutes(store, actions));
  renderServices.getUrl = router.getUrl.bind(router);

  return router.runUrl(location).then(() => {
    const state = store.getState();
    const rendered = renderer(state, boundActions, renderServices);
    let html = getTemplate();

    html = injectData(html, state.toServerData());
    html = injectRender(html, rendered);
    return html;
  });
}

app.use('/asset/component.css', (req, res) => {
  res.set('Content-Type', 'text/css');
  res.send(getComponentCss());
});

app.use('/asset', express.static('dist/asset'));

app.use((req, res, next) => {
  renderApp(req.path).then(html => {
    res.send(html);
  }).catch(e => {
    if (e) console.error(e.stack || e);
    next();
  });
});

export default app;
