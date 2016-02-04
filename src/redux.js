import { createStore } from 'redux';
import reducer from './reducer';
import * as actions from './action';

const actionNames = [
  'testAction',
];

export default function createRedux(renderer, initialState, debug, settings) {
  let lastState = initialState;

  const store = createStore(reducer, initialState);
  if (settings.debug) debug.register('store', store);

  const boundActions = {};
  if (settings.debug) debug.register('boundActions', boundActions);

  actionNames.forEach(name => {
    boundActions[name] = (...args) =>
      store.dispatch(actions[name](...args));
  });

  store.subscribe(() => {
    const state = store.getState();
    if (state !== lastState) {
      lastState = state;
      renderer(state, actions);
    }
  });

  return boundActions;
}
