import express from 'express';
import createDebug from 'debug';
import { memoize } from 'lodash/function';
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
import createRouter from './router';
import { getCss } from './component/styles';
import env from 'node-env';

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

const injectCss = (output, css) =>
  output.replace(/(id=(['"]?)css\2>)/, `$1${css}`);

export function getComponentCss() {
  const source = getCss({ pretty: !prod });
  const css = String(postcss([autoprefixer]).process(source));
  return prod ? new CleanCSS().minify(css).styles : css;
}

export function renderApp(location, callback) {
  let router;

  const renderServices = {};
  const initialState = new DataTree();
  const actions = createActions(() => router);

  const { boundActions } = createRedux(initialState, actions, state => {
    const rendered = renderer(state, boundActions, router.getUrl, renderServices);
    const css = getComponentCss();
    const html = injectRender(injectData(injectCss(getTemplate(),
      css), state.toServerData()), rendered);
    callback(null, html);
  });

  router = createRouter(createRoutes(boundActions));
  renderServices.getUrl = router.getUrl.bind(router);

  if (!router.match(location)) {
    callback(null, null);
  } else {
    router.setUrl(location);
  }
}

app.use('/asset', express.static('dist/asset'));

app.use((req, res, next) => {
  renderApp(req.path, (err, html) => {
    if (html) {
      res.send(html);
    } else {
      next();
    }
  });
});

export default app;
