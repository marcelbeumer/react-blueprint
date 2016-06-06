// @flow
import { Observable } from 'rxjs';

function demo(value: any, input: Object, state: Object, actions: Object): any {
  if (value === '__MIDDLEWARE_DEMO__') {
    actions.setListEnd(0);
    return null;
  }
  return value;
}

function valueTypes(value: any, input: Object, state: Object): any {
  const subscriber = () => ({
    next: nextValue => input.next(nextValue),
    error: err => input.error(err),
  });

  return !value ? state.value :
    value.then ? Observable.fromPromise(value).subscribe(subscriber()) && state.value :
    value.subscribe ? value.subscribe(subscriber()) && state.value :
    value;
}

export default [
  demo,
  valueTypes,
];
