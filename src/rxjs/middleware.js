// @flow
import createDebug from 'debug';
import { Observable } from 'rxjs';
import { Collection } from 'immutable';
import { Action, ExternalAction } from '../rxjs';

export default function createMiddleware(
  input: Object,
  state: Object,
  handlers: Object
): Array<Function> {
  const debug = createDebug('rxjs');
  const nextValue = value => input.next({ value });

  const subscriber = () => ({
    next: next => input.next(next),
    error: err => input.error(err),
  });

  const passObservable = (observable, path) => {
    observable.map(value => ({ value, path })).subscribe(subscriber());
    return state.value;
  };

  const passPromise = (promise, path) =>
    passObservable(Observable.fromPromise(promise), path);

  const passValue = (value) => {
    nextValue(value);
    return state.value;
  };

  const getValue = (value, path) =>
    (path ? state.value.setIn(path.split('.'), value) : value);

  function demoMiddleware(next) {
    if (next.value === '__MIDDLEWARE_DEMO__') {
      nextValue(new Action('setListEnd', 0));
      return null;
    }
    return next;
  }

  function actionRequestMiddleware(next) {
    if (next.value instanceof Action) {
      const handler = handlers[next.value.name];
      if (handler) {
        const postfix = next.value instanceof ExternalAction ? '' : ' (internal)';
        debug(`action call ${next.value.name}${postfix}`);
        return handler(...next.value.args);
      }
    }

    return next;
  }

  function valueTypesMiddleware({ value, path } = {}) {
    return !value ? state.value :
      value instanceof Action ? passValue(value, input, state) :
      value instanceof Collection ? getValue(value, path, state) :
      value.then ? passPromise(value, path, input, state) :
      value.subscribe ? passObservable(value, path, input, state) :
      state.value;
  }

  return [
    actionRequestMiddleware,
    demoMiddleware,
    valueTypesMiddleware,
  ];
}
