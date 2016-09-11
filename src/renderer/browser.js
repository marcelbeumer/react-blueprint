// @flow
import React from 'react'; // eslint-disable-line no-unused-vars
import createDebug from 'debug';
import ReactDOM from 'react-dom';
import DataTree from '../data/tree';
import { getRootComponent } from '../old-component';

const debug = createDebug('renderer');

export default function createRenderer(element: Object): Function {
  return function render(dataTree: DataTree, actions: Object, services: Object) {
    const Root = getRootComponent(dataTree);
    debug('render start');

    ReactDOM.render(
      <Root {...dataTree.toObject()} actions={actions} services={services} />,
      element, () => debug('render end'));
  };
}
