import express from 'express';
import createDebug from 'debug';
import { memoize } from 'lodash/function';
import fs from 'fs';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import CleanCSS from 'clean-css';
import settings from '../settings/server';
import createRenderer from './renderer/server';
import DataTree from './data/tree';
import createRedux from './redux';
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

export function renderHomepage() {
  const initialState = new DataTree();
  const { actions } = createRedux(initialState);
  const rendered = renderer(initialState, actions);
  const css = getComponentCss();
  const html = injectRender(injectData(injectCss(getTemplate(),
    css), initialState.toServerData()), rendered);
  return html;
}

app.get('/', (req, res) => {
  res.send(renderHomepage());
});

app.use(express.static('dist'));

export default app;
