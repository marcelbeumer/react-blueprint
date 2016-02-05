import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import createDebug from 'debug';
import { getRootComponent } from './component';
import { expose } from './global';

const debug = createDebug('renderer');

export default function createRenderer(element, /* settings */) {
  return function render(renderData, actions) {
    const Root = getRootComponent();
    expose('renderData', renderData);
    debug('render start');

    ReactDOM.render(
      <Root {...renderData.toObject()} actions={actions}/>,
      element, () => debug('render end'));
  };
}
