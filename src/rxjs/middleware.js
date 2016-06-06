// @flow
import { Observable } from 'rxjs';

const subscriber = input => ({
  next: nextValue => input.next(nextValue),
  error: err => input.error(err),
});

const fromPromise = (promise, input) =>
  Observable.fromPromise(promise).subscribe(subscriber(input));

const fromObservable = (observable, input) =>
  observable.subscribe(subscriber(input));

export default function createMiddleware(
  input: Object,
  state: Object,
  actions: Object
): Array<Function> {
  //
  function demoMiddleware(value) {
    if (value === '__MIDDLEWARE_DEMO__') {
      actions.setListEnd(0);
      return null;
    }
    return value;
  }

  function valueTypesMiddleware(value) {
    return !value ? state.value :
      value.then ? fromPromise(value, input) && state.value :
      value.subscribe ? fromObservable(value, input) && state.value :
      value;
  }

  return [
    demoMiddleware,
    valueTypesMiddleware,
  ];
}
