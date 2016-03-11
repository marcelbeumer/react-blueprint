import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOMServer from 'react-dom/server';
import createDebug from 'debug';
import { getRootComponent } from '../component';

const debug = createDebug('renderer');

export default function createRenderer() {
  return function render(dataTree, actions, getUrl) {
    const Root = getRootComponent(dataTree);
    debug('render start');

    const html = ReactDOMServer.renderToString(
      <Root {...dataTree.toObject()} actions={actions} getUrl={getUrl} />);

    debug('render end');
    return html;
  };
}
