import express from 'express';
import createDebug from 'debug';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import CleanCSS from 'clean-css';
import { memoize } from 'lodash/function';
import fs from 'fs';
import settings from '../settings/server';
import createRenderer from './renderer/server';
import DataTree from './data/tree';
import createRedux from './redux';
import { getCss } from './component/styles';

const debug = createDebug('server');
debug('starting server');

const renderer = createRenderer(settings);
const app = express();

const getTemplate = memoize(() =>
  String(fs.readFileSync(`${__dirname}/../dist/index.html`)));

const injectData = (output, data) =>
  output.replace(/(id=(['"]?)data\2>)/, `$1${JSON.stringify(data)}`);

const injectRender = (output, render) =>
  output.replace(/(id=(['"]?)root\2>)/, `$1${render}`);

const injectCss = (output, css) =>
  output.replace(/(id=(['"]?)css\2>)/, `$1${css}`);

export function getComponentCss() {
  const source = require('./style')() + getCss();
  const css = String(postcss([autoprefixer]).process(source));
  const minifiedCss = new CleanCSS().minify(css).styles;
  return minifiedCss;
}

app.get('/', (req, res) => {
  const initialState = new DataTree();
  const { actions } = createRedux(initialState);
  const rendered = renderer(initialState, actions);
  const css = getComponentCss();
  const html = injectRender(injectData(injectCss(
    getTemplate(), css), initialState.toServerData()), rendered);
  res.send(html);
});

app.use(express.static('dist'));

export default app;
