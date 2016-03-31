// @flow
/* eslint no-console:0 */
import 'babel-polyfill';
import express from 'express';
import fs from 'fs';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import CleanCSS from 'clean-css';
import settings from '../settings/server';
import webpackConfig from '../settings/webpack';
import DataTree from './data/tree';
import createRenderer from './renderer/server';
import createActions from './action';
import createRedux from './redux';
import createRoutes from './route';
import Router, { InvalidRouteError } from './router';
import { getCss } from './component/styles';
import env from 'node-env';

const SSR = process.env.SSR;
const REVISION = process.env.REVISION || String(Number(new Date()));
const prod = env === 'production';
const app = express();
const renderer = createRenderer(settings);

const getTemplate = (assetFs = fs) =>
  String(assetFs.readFileSync(`${__dirname}/index.html`));

const injectData = (output, data) =>
  output.replace(/(id=(['"]?)data\2>)/, `$1${JSON.stringify(data, null, prod ? 0 : 2)}`);

const injectRender = (output, render) =>
  output.replace(/(id=(['"]?)root\2>)/, `$1${render}`);

const injectAssetPath = (output, assetPath) =>
  output.replace(/__ASSETS__/g, assetPath);

const injectRevision = (output: string, revision: string): string =>
  output.replace(/__REVISION__/g, revision);

export function getComponentCss(): string {
  const source = getCss({ pretty: !prod });
  const css = String(postcss([autoprefixer]).process(source));
  return prod ? new CleanCSS().minify(css).styles : css;
}

export function renderApp(location: string, assetFs: any): Promise {
  let router: Router;

  const renderServices = {};
  const initialState = new DataTree();
  const actions = createActions(() => router);

  const x: number = 123;
  createRedux(x, actions);
  const { store, boundActions } = createRedux(initialState, actions);
  router = new Router(createRoutes(store, actions), location); // eslint-disable-line prefer-const
  renderServices.getUrl = router.getUrl.bind(router);

  return router.runUrl(location).then(() => {
    const state = store.getState();
    const rendered = renderer(state, boundActions, renderServices);
    let html = getTemplate(assetFs);

    html = injectAssetPath(html, webpackConfig.output.publicPath);
    html = injectRevision(html, REVISION);
    html = injectData(html, state.toServerData());
    html = injectRender(html, rendered);
    return html;
  });
}

export function staticApp(location: string, assetFs: any): Promise {
  return new Promise(resolve => {
    const html = getTemplate(assetFs);
    resolve(html);
  });
}

export default function createApp(assetFs: any): any {
  app.use('/asset/component.css', (req, res) => {
    res.set('Content-Type', 'text/css');
    res.send(getComponentCss());
  });

  app.use('/asset', express.static('dist/asset'));

  app.use((req, res, next) => {
    const ssr = req.query.ssr || SSR;
    const useRender = parseInt(ssr, 10) !== 0;
    const handler = useRender ? renderApp : staticApp;

    handler(req.path, assetFs).then(html => {
      res.send(html);
    }).catch(e => {
      if (!(e instanceof InvalidRouteError)) {
        console.error(e.stack || e);
        res.send(e.stack || e);
      } else {
        next();
      }
    });
  });

  return app;
}
