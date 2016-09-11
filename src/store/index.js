// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import multi from 'redux-multi';
import reducer from './reducer';

export type Store = Object;

export default function createReduxStore(initialState: Object): Store {
  const middleware = applyMiddleware(multi, promise, thunk);
  return createStore(reducer, initialState, middleware);
}
