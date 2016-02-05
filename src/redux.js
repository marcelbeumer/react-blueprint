import { createStore } from 'redux';
import createDebug from 'debug';
import reducer from './reducer';
import * as actions from './action';
import { expose } from './global';

const debug = createDebug('redux');

export default function createRedux(renderer, initialState, /* settings */) {
  let lastState = initialState;
  expose('lastState', lastState);

  const store = createStore(reducer, initialState);
  expose('store', store);

  const boundActions = {};
  expose('boundActions', boundActions);

  Object.keys(actions).forEach(name => {
    boundActions[name] = (...args) => {
      debug(`bound action call ${name}`);
      const action = actions[name](...args);
      debug(`dispatch action ${name}`);
      store.dispatch(action);
    };
  });

  store.subscribe(() => {
    const state = store.getState();
    if (state !== lastState) {
      lastState = state;
      expose('lastState', lastState);
      renderer(state, actions);
    }
  });

  return boundActions;
}
