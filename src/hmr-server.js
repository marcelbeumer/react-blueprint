/* eslint no-console:0 */
import path from 'path';
import express from 'express';
import morgan from 'morgan';
import webpack from 'webpack';
import webpackConfig from '../settings/webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const app = express();
const compiler = webpack(webpackConfig);

app.use(morgan('short'));

app.use('/asset/component.css', (req, res) => {
  require('./component');
  const { getCss } = require('./component/styles');

  res.set('Content-Type', 'text/css');
  res.send(getCss());

  const base = path.dirname(require.resolve('./component'));
  Object.keys(require.cache).forEach(entry => {
    if (entry.indexOf(base) === 0) {
      delete require.cache[entry];
    }
  });
});

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
}));

app.use(webpackHotMiddleware(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000,
}));

export default app;
