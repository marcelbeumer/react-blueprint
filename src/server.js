// @flow
/* eslint no-console:0 */
import 'babel-polyfill';
import express from 'express';
import fs from 'fs';
import settings from '../settings/server';
import webpackConfig from '../settings/webpack';
import DataTree from './data/tree';
import createRenderer from './renderer/server';
import createRedux from './redux';
import createRoutes from './route';
import Router, { InvalidRouteError } from './router';
import env from 'node-env';

const SSR = String(process.env.SSR);
const REVISION = process.env.REVISION || String(Number(new Date()));
const prod = env === 'production';
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

export function renderApp(location: string, assetFs: any): Promise {
  let router: Router; // eslint-disable-line prefer-const

  const actionServices = {};
  const renderServices = {};
  const initialState = new DataTree();

  const { store, actions } = createRedux(initialState, actionServices);
  router = new Router(createRoutes(actions), location); // eslint-disable-line prefer-const

  renderServices.setUrl = router.setUrl.bind(router);
  renderServices.getUrl = router.getUrl.bind(router);

  return router.runUrl(location).then(() => {
    const state = store.getState();
    const rendered = renderer(state, actions, renderServices);
    let html = getTemplate(assetFs);

    html = injectAssetPath(html, webpackConfig.output.templateAssetPath);
    html = injectRevision(html, REVISION);
    html = injectData(html, state.toServerData());
    html = injectRender(html, rendered);
    return html;
  });
}

export function staticApp(location: string, assetFs: any): Promise {
  return new Promise(resolve => {
    let html = getTemplate(assetFs);
    html = injectAssetPath(html, webpackConfig.output.templateAssetPath);
    html = injectRevision(html, REVISION);
    resolve(html);
  });
}

export function handleApp(location: string, assetFs: any, ssr: string = SSR): Promise {
  const useRender = parseInt(ssr, 10) !== 0;
  const handler = useRender ? renderApp : staticApp;
  return handler(location, assetFs);
}

export default function createApp(assetFs: any): any {
  const app = express();

  app.use('/asset', express.static('dist/asset'));

  app.use((req, res, next) => {
    handleApp(req.path, assetFs, req.query.ssr).then(html => {
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
