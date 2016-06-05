// @flow
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import mapValues from 'lodash/mapValues';
import createDebug from 'debug';
import createActionHandlers from './action';

export type StoreResult = {state: any, input: any, actions: Object};

const debug = createDebug('rxjs');

function createActions(actionHandlers, input, getState) {
  return mapValues(actionHandlers, (handler, name) => (...args) => {
    try {
      debug(`action call ${name}`);
      const result = handler(getState, ...args);
      input.next(result);
    } catch (e) {
      debug(`exception in action call ${name}`);
      input.error(e);
    }
  });
}

function createMiddleware(getState, actions) {
  return (value) => {
    if (value === '__MIDDLEWARE_DEMO__') {
      actions.setListEnd(0);
      return null;
    }
    return value;
  };
}

function createValueProcessor(getState, input) {
  const subscriber = {
    next: value => input.next(value),
    error: value => input.error(value),
  };

  return value => (
    !value ? getState() :
    value.then ? Observable.fromPromise(value).subscribe(subscriber) && getState() :
    value.subscribe ? value.subscribe(subscriber) && getState() :
    value
  );
}

export default function createRxJsStore(
  initialState: any,
  actionServices: Object,
): StoreResult {
  const state = new BehaviorSubject(initialState);
  const input = new Subject();
  const getState = () => state.value;
  const actionHandlers = createActionHandlers(actionServices);
  const actions = createActions(actionHandlers, input, getState);

  input
    .map(createMiddleware(getState, actions))
    .map(createValueProcessor(getState, input))
    .distinctUntilChanged()
    .subscribe(state);

  return { state, input, actions };
}
