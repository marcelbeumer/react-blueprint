// @flow
import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOMServer from 'react-dom/server';
import baseRenderer from './base';

export default function render(store: Object): string {
  return ReactDOMServer.renderToString(baseRenderer(store));
}
