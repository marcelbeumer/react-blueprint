/* eslint no-console:0 */
import express from 'express';
import webpack from 'webpack';
import webpackConfig from '../settings/webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import once from 'lodash/once';
import path from 'path';

process.on('unhandledRejection', (value = {}) =>
  console.error(value.stack || value));

const app = express();
const compiler = webpack(webpackConfig);

const devMiddleware = webpackDevMiddleware(compiler, {
  stats: true,
  publicPath: webpackConfig.output.publicPath,
});

const hotMiddleware = webpackHotMiddleware(compiler, {
  log: console.log,
  path: '/hmr/__webpack_hmr',
  heartbeat: 10 * 1000,
});


function clearRequire(modulePath) {
  const base = path.resolve(modulePath);
  Object.keys(require.cache).forEach(entry => {
    if (entry.indexOf(base) === 0) {
      delete require.cache[entry];
    }
  });
}

function serverMiddleware(req, res, next) {
  const server = require('./server').default(compiler.outputFileSystem);
  server(req, res, next);
}

compiler.plugin('watch-run', (c, callback) => {
  clearRequire(__dirname);
  hotMiddleware.publish({
    action: 'reload-stilr',
    payload: require('./server').getComponentCss(),
  });
  callback();
});

app.use(devMiddleware);
app.use(hotMiddleware);

let ready = false;
app.use((req, res, next) => {
  const done = () => serverMiddleware(req, res, next);

  if (!ready) {
    compiler.plugin('done', once(() => {
      ready = true;
      done();
    }));
  } else {
    done();
  }
});

export default app;
