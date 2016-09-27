// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import multi from 'redux-multi';
import reducer from './reducer';

export default (initialState: Object): Object =>
  createStore(
    reducer,
    initialState,
    applyMiddleware(
      multi,
      promise,
      thunk,
    )
  );
