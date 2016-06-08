// @flow
import createDebug from 'debug';
import { Observable } from 'rxjs';
import { Collection } from 'immutable';
import { Action } from '../rxjs';

const debug = createDebug('rxjs');

const subscriber = input => ({
  next: nextValue => input.next(nextValue),
  error: err => input.error(err),
});

const fromObservable = (observable, path, input, state) => {
  observable
    .map(value => ({ value, path }))
    .subscribe(subscriber(input));
  return state.value;
};

const fromPromise = (promise, path, input, state) =>
  fromObservable(Observable.fromPromise(promise), path, input, state);

const fromAction = (value, input, state) => {
  input.next(value);
  return state.value;
};

const getValue = (value, path, state) =>
  (path ? state.value.setIn(path.split('.'), value) : value);

export default function createMiddleware(
  input: Object,
  state: Object,
  handlers: Object
): Array<Function> {
  //
  function actionRequestMiddleware(next) {
    if (next instanceof Action) {
      const handler = handlers[next.name];
      if (handler) {
        debug(`action call ${next.name}`);
        return handler(...next.args);
      }
    }

    return next;
  }

  function valueTypesMiddleware({ value, path } = {}) {
    return !value ? state.value :
      value instanceof Action ? fromAction(value, input, state) :
      value instanceof Collection ? getValue(value, path, state) :
      value.then ? fromPromise(value, path, input, state) :
      value.subscribe ? fromObservable(value, path, input, state) :
      state.value;
  }

  return [
    actionRequestMiddleware,
    valueTypesMiddleware,
  ];
}
