// @flow
import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import baseRenderer from './base';

export default function render(store: Object, element: Object) {
  ReactDOM.render(baseRenderer(store), element);
}
