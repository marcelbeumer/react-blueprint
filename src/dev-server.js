// @flow
/* eslint no-console:0 */
import 'babel-polyfill';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import path from 'path';
import fs from 'fs';
import once from 'lodash/once';
import env from 'node-env';
import webpackConfig from '../settings/webpack';
import getComponentCss from './component-css';

process.on('unhandledRejection', (value = {}) =>
  console.error(value.stack || value));

const prod = env === 'production';
const app = express();
const compiler = webpack(webpackConfig);
const { publicPath } = webpackConfig.output;

let bundleReady = false;
compiler.plugin('done', () => {
  bundleReady = true;
});

function clearRequire(modulePath) {
  const base = path.resolve(modulePath);
  Object.keys(require.cache).forEach(entry => {
    if (entry.indexOf(base) === 0) {
      delete require.cache[entry];
    }
  });
}

function ready(): Promise {
  return new Promise(resolve => {
    if (bundleReady) {
      resolve();
    } else {
      compiler.plugin('done', once(() => resolve()));
    }
  });
}

function serverMiddleware(req, res, next) {
  const server = require('./server').default(fs); // eslint-disable-line global-require
  server(req, res, next);
}

compiler.plugin('watch-run', (c, callback) => {
  clearRequire(__dirname);
  callback();
});

app.use(path.join(publicPath, 'component.css'), (req, res) => {
  res.set('Content-Type', 'text/css');
  ready().then(() => res.send(getComponentCss(prod)));
});

app.use(webpackDevMiddleware(compiler, {
  stats: true,
  publicPath: webpackConfig.output.publicPath,
}));

app.use((req, res, next) => {
  ready().then(() => serverMiddleware(req, res, next));
});

export default app;
