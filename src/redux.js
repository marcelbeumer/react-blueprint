import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createDebug from 'debug';
import reducer from './reducer';
import * as actions from './action';

const debug = createDebug('redux');

export default function createRedux(initialState, onChange, /* settings */) {
  let lastState = initialState;

  const middleware = applyMiddleware(promise, thunk);
  const store = createStore(reducer, initialState, middleware);
  const boundActions = {};

  Object.keys(actions).forEach(name => {
    boundActions[name] = (...args) => {
      debug(`bound action call ${name}`);
      const action = actions[name](...args);
      if (action) {
        debug(`dispatch action ${name}`);
        store.dispatch(action);
      }
    };
  });

  store.subscribe(() => {
    const state = store.getState();
    if (state !== lastState) {
      lastState = state;
      if (onChange) onChange(state, boundActions);
    }
  });

  return { store, actions: boundActions };
}
