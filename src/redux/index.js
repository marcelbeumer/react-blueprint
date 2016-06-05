// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import multi from 'redux-multi';
import createDebug from 'debug';
import createActionHandlers from './action';
import reducer from './reducer';

export type Store = {dispatch: Function, subscribe: Function, getState: Function};
export type ReduxStoreResult = {store: Store, actions: Object};

const debug = createDebug('redux');

function createActions(actionHandlers, store) {
  const actions = {};

  Object.keys(actionHandlers).forEach(name => {
    actions[name] = (...args) => {
      debug(`action call ${name}`);
      const action = actionHandlers[name](...args);
      if (action) {
        debug(`dispatch action ${name}`);
        store.dispatch(action);
      }
    };
  });

  return actions;
}

export default function createReduxStore(
  initialState: any,
  actionServices: Object,
  onChange: ?Function,
): ReduxStoreResult {
  let lastState = initialState;
  const middleware = applyMiddleware(multi, promise, thunk);
  const store: Store = createStore(reducer, initialState, middleware);
  const actionHandlers = createActionHandlers(actionServices);
  const actions = createActions(actionHandlers, store);
  const boundActions = {};

  store.subscribe(() => {
    const state = store.getState();
    if (state !== lastState) {
      lastState = state;
      if (onChange) onChange(state, boundActions);
    }
  });

  return { store, actions };
}
