import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import createDebug from 'debug';
import { getRootComponent } from '../component';

const debug = createDebug('renderer');

export default function createRenderer(element, /* settings */) {
  return function render(dataTree, actions) {
    const Root = getRootComponent(dataTree);
    debug('render start');

    ReactDOM.render(
      <Root {...dataTree.toObject()} actions={actions} />,
      element, () => debug('render end'));
  };
}
