import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operator/map';
import { distinctUntilChanged } from 'rxjs/operator/distinctUntilChanged';
import createDebug from 'debug';
import createActionHandlers from './action';

export type StoreResult = {store: any, state: any, actions: Object};

const debug = createDebug('rxjs');

function makeObservable(thing) {
  return thing.subscribe ? thing :
    thing.then ? Observable::fromPromise(thing) :
    Observable::of(thing);
}

function createActions(actionHandlers, state, store) {
  const actions = {};

  Object.keys(actionHandlers).forEach(name => {
    actions[name] = (...args) => {
      debug(`action call ${name}`);
      const result = actionHandlers[name](() => state.value, ...args);
      store.next(result);
    };
  });

  return actions;
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

function createValueProcessor(state, store) {
  return (value) => {
    if (!value) return state.value;

    if (value.subscribe || value.then) {
      makeObservable(value).subscribe((nextValue) => store.next(nextValue));
      return state.value;
    }

    return value;
  };
}

export default function createAppStore(
  initialState: any,
  actionServices: Object,
): StoreResult {
  const state = new BehaviorSubject(initialState);
  const store = new Subject();
  const actionHandlers = createActionHandlers(actionServices);
  const actions = createActions(actionHandlers, state, store);
  const middleware = createMiddleware(() => state.value, actions);
  const valueProcessor = createValueProcessor(state, store);

  store
    ::map(middleware)
    ::map(valueProcessor)
    ::distinctUntilChanged()
    .subscribe(state);

  return { state, store, actions };
}
