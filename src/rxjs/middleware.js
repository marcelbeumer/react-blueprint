// @flow
import { Observable } from 'rxjs';

const subscriber = input => ({
  next: nextValue => input.next(nextValue),
  error: err => input.error(err),
});

function demo(value: any, input: Object, state: Object, actions: Object): any {
  if (value === '__MIDDLEWARE_DEMO__') {
    actions.setListEnd(0);
    return null;
  }
  return value;
}

function valueTypes(value: any, input: Object, state: Object): any {
  return !value ? state.value :
    value.then ? Observable.fromPromise(value).subscribe(subscriber(input)) && state.value :
    value.subscribe ? value.subscribe(subscriber(input)) && state.value :
    value;
}

export default [
  demo,
  valueTypes,
];
