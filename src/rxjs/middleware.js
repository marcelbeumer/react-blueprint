// @flow
import createDebug from 'debug';
import { Observable } from 'rxjs';
import { Collection } from 'immutable';
import { Action } from '../rxjs';

const debug = createDebug('rxjs');

export default function createMiddleware(
  input: Object,
  state: Object,
  handlers: Object
): Array<Function> {
  //
  const subscriber = () => ({
    next: nextValue => input.next(nextValue),
    error: err => input.error(err),
  });

  const fromObservable = (observable, path) => {
    observable.map(value => ({ value, path })).subscribe(subscriber());
    return state.value;
  };

  const fromPromise = (promise, path) =>
    fromObservable(Observable.fromPromise(promise), path);

  const fromAction = (value) => {
    input.next(value);
    return state.value;
  };

  const getValue = (value, path) =>
    (path ? state.value.setIn(path.split('.'), value) : value);

  function actionRequestMiddleware(next) {
    if (next.value instanceof Action) {
      const handler = handlers[next.value.name];
      if (handler) {
        debug(`action call ${next.name}`);
        return handler(...next.value.args);
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
