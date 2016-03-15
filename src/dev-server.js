/* eslint no-console:0 */
import express from 'express';
import createDebug from 'debug';
import webpack from 'webpack';
import webpackConfig from '../settings/webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import path from 'path';

process.on('unhandledRejection', (value = {}) =>
  console.error(value.stack || value));

const debug = createDebug('server');
debug('starting server');

const LOAD_TIME_MESSAGE = 'Loading server code';
const app = express();
const compiler = webpack(webpackConfig);

const clearRequire = modulePath => {
  const base = path.resolve(modulePath);
  Object.keys(require.cache).forEach(entry => {
    if (entry.indexOf(base) === 0) {
      delete require.cache[entry];
    }
  });
};

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
}));

app.use((req, res, next) => {
  console.time(LOAD_TIME_MESSAGE);
  clearRequire(__dirname);
  const server = require('./server').default;
  console.timeEnd(LOAD_TIME_MESSAGE);
  server(req, res, next);
});

export default app;
