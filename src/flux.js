import isPlainObject from 'lodash/isPlainObject';
import createDebug from 'debug';
import reducer from './reducer';
import * as actions from './action';

const debug = createDebug('flux');
const isIterator = (obj) => obj && typeof obj.next === 'function';
const isPromise = (obj) => obj && typeof obj.then === 'function';

class Dispatcher {
  constructor(initialState, onChange) {
    this.state = initialState;
    this.onChange = onChange;
    this.actions = {};

    Object.keys(actions).forEach(name => {
      this.actions[name] = (...args) => {
        debug(`bound action call ${name}`);
        const action = actions[name](...args);
        debug(`dispatch action ${name}`);
        this.dispatch(action);
      };
    });
  }

  setState(state) {
    if (state !== this.state) {
      this.state = state;
      if (this.onChange) this.onChange(state);
    }
  }

  handlePromise(promise) {
    promise
      .then(action => isPlainObject(action) && this.dispatch(action))
      .catch(action => isPlainObject(action) && this.dispatch(action));
  }

  handleIterator(iterator) {
    let iter = iterator.next();
    const state = iter.value;
    this.setState(state);
    do {
      iter = iterator.next();
      const value = iter.value;
      if (isIterator(value)) {
        this.handleIterator(value);
      } else if (isPromise(value)) {
        this.handlePromise(value);
      } else {
        this.dispatch(value);
      }
    } while (!iter.done);
  }

  handleResult(result) {
    if (isIterator(result)) {
      this.handleIterator(result);
    } if (isPromise(result)) {
      this.handlePromise(result);
    } else {
      this.setState(result);
    }
  }

  dispatch(action) {
    if (!isPlainObject(action)) throw new Error('Can only dispatch plain objects');
    const result = reducer(this.state, action);
    this.handleResult(result);
  }
}

export default function createFlux(initialState, onChange) {
  const dispatcher = new Dispatcher(initialState, onChange);
  return { actions: dispatcher.actions };
}
