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

function demoMiddleware(value: any, input: Object, state: Object, actions: Object): any {
  if (value === '__MIDDLEWARE_DEMO__') {
    actions.setListEnd(0);
    return null;
  }
  return value;
}

function valueTypesMiddleware(value: any, input: Object, state: Object): any {
  return !value ? state.value :
    value.then ? fromPromise(value, input) && state.value :
    value.subscribe ? fromObservable(value, input) && state.value :
    value;
}

export default [
  demoMiddleware,
  valueTypesMiddleware,
];
