// @flow
import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import Collection from 'immutable';
import createDebug from 'debug';
import { getRootComponent } from '../component';

const debug = createDebug('renderer');

export default function createRenderer(element: Object): Function {
  return function render(dataTree: Collection, actions: Object, services: Object) {
    const Root = getRootComponent(dataTree);
    debug('render start');

    ReactDOM.render(
      <Root {...dataTree.toObject()} actions={actions} services={services} />,
      element, () => debug('render end'));
  };
}
