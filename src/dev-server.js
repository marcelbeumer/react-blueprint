/* eslint no-console:0 */
import express from 'express';
import webpack from 'webpack';
import webpackConfig from '../settings/webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import path from 'path';

process.on('unhandledRejection', (value = {}) =>
  console.error(value.stack || value));

const app = express();
const compiler = webpack(webpackConfig);

let bundleReady = false;
compiler.plugin('done', () => {
  bundleReady = true;
});

const clearRequire = modulePath => {
  const base = path.resolve(modulePath);
  Object.keys(require.cache).forEach(entry => {
    if (entry.indexOf(base) === 0) {
      delete require.cache[entry];
    }
  });
};

compiler.plugin('watch-run', (c, callback) => {
  clearRequire(__dirname);
  callback();
});

app.use(webpackDevMiddleware(compiler, {
  stats: true,
  publicPath: webpackConfig.output.publicPath,
}));

app.use((req, res, next) => {
  if (bundleReady) {
    const server = require('./server').default(compiler.outputFileSystem);
    server(req, res, next);
  } else {
    res.send('Webpack bundle not ready yet');
  }
});

export default app;
