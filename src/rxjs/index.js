import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs/observable/of';
import createDebug from 'debug';
import createActionHandlers from './action';

export type StoreResult = {store: any, actions: Object};

const debug = createDebug('rxjs');

function createActions(actionHandlers, store) {
  const actions = {};

  Object.keys(actionHandlers).forEach(name => {
    actions[name] = (...args) => {
      debug(`action call ${name}`);
      const result = actionHandlers[name](() => store.value, ...args);

      if (result) {
        const observable = result.subscribe ? result :
          result.then ? Observable::fromPromise(result) :
          Observable::of(result);

        debug(`subscribe action ${name}`);
        observable.subscribe((value) => store.next(value));
      }
    };
  });

  return actions;
}

export default function createAppStore(
  initialState: any,
  actionServices: Object,
): StoreResult {
  const store = new BehaviorSubject(initialState);
  const actionHandlers = createActionHandlers(actionServices);
  const actions = createActions(actionHandlers, store);
  return { store, actions };
}
