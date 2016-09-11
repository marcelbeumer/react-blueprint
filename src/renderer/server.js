import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOMServer from 'react-dom/server';
import Collection from 'immutable';
import createDebug from 'debug';
import { getRootComponent } from '../old-component';

const debug = createDebug('renderer');

export default function createRenderer(): Function {
  return function render(dataTree: Collection, actions: Object, services: Object): string {
    const Root = getRootComponent(dataTree);
    debug('render start');

    const html = ReactDOMServer.renderToString(
      <Root {...dataTree.toObject()} actions={actions} services={services} />);

    debug('render end');
    return html;
  };
}
