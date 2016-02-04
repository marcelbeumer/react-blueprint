import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import { getRootComponent } from './component';

export default function createRenderer(element, debug, settings) {
  return function render(renderData, actions) {
    const Root = getRootComponent();

    if (settings.debug) debug.register('renderData', renderData);

    ReactDOM.render(
      <Root {...renderData.toObject()} actions={actions}/>,
      element);
  };
}
