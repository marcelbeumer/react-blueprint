// @flow
/* eslint no-console:0 */
import 'babel-polyfill';
import express from 'express';
import fs from 'fs';
import webpackConfig from '../webpack.config';
import bootstrapServer from './bootstrap/server';
import { InvalidRouteError } from './router';
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

export function renderApp(location: string, assetFs: any): Promise<string> {
  const { store, render } = bootstrapServer();
  const rendered = render(store);
  let html = getTemplate(assetFs);

  html = injectAssetPath(html, webpackConfig.output.templateAssetPath);
  html = injectRevision(html, REVISION);
  html = injectData(html, store.getState().toServerData());
  html = injectRender(html, rendered);
  return Promise.resolve(html);
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
