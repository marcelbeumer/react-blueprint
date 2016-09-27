// @flow
/* eslint no-console:0 */
import 'babel-polyfill';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import fs from 'fs';
import webpackConfig from '../webpack.config';
import DataTree from './data/tree';
import createStore from './store';
import * as actions from './store/action';
import Router, { InvalidRouteError } from './router/Router';
import routes from './routes';
import RootComponent from './component';
import env from 'node-env';

const SSR = String(process.env.SSR);
const REVISION = process.env.REVISION || String(Number(new Date()));
const prod = env === 'production';

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

function bootstrapApp(location: string): Object {
  const initialState = new DataTree();
  const store = createStore(initialState);
  const setScreen = (value) => store.dispatch(actions.setScreen(value));
  const routeServices = { setScreen };
  const router = new Router(routes(routeServices), location);

  return {
    render: () => ReactDOMServer.renderToString(<RootComponent store={store} />),
    store,
    router,
  };
}

export function renderApp(location: string, assetFs: any): Promise<string> {
  const { store, render, router } = bootstrapApp(location);

  return router.runUrl(location).then(() => {
    const rendered = render();
    let html = getTemplate(assetFs);

    html = injectAssetPath(html, webpackConfig.output.templateAssetPath);
    html = injectRevision(html, REVISION);
    html = injectData(html, store.getState().toServerData());
    html = injectRender(html, rendered);
    return html;
  });
}

export function staticApp(location: string, assetFs: any): Promise<string> {
  return new Promise(resolve => {
    let html = getTemplate(assetFs);
    html = injectAssetPath(html, webpackConfig.output.templateAssetPath);
    html = injectRevision(html, REVISION);
    resolve(html);
  });
}

export function handleApp(location: string, assetFs: any, ssr: string = SSR): Promise<string> {
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
