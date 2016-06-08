// @flow
import { Observable } from 'rxjs';
import { Collection } from 'immutable';

const subscriber = input => ({
  next: nextValue => input.next(nextValue),
  error: err => input.error(err),
});

const fromObservable = (observable, path, input) =>
  observable
    .map(value => ({ value, path }))
    .subscribe(subscriber(input));

const fromPromise = (promise, path, input) =>
  fromObservable(Observable.fromPromise(promise), path, input);

const getValue = (value, path, state) =>
  (path ? state.value.setIn(path.split('.'), value) : value);

export class ActionRequest {
  type: string;
  name: string;
  args: Array<any>;
  constructor(name: string, ...args: Array<any>) {
    this.type = 'ACTION_REQUEST';
    this.name = name;
    this.args = args;
  }
}

export default function createMiddleware(
  input: Object,
  state: Object,
  actions: Object
): Array<Function> {
  //
  function demoMiddleware(next) {
    if (next.value === '__MIDDLEWARE_DEMO__') {
      actions.setListEnd(0);
      return null;
    }
    return next;
  }

  function actionRequestMiddleware(next) {
    if (next.value instanceof ActionRequest) {
      const action = actions[next.value.name];
      if (action) action(...next.value.args);
      return null;
    }
    return next;
  }

  function valueTypesMiddleware({ value, path }) {
    return !value ? state.value :
      value instanceof Collection ? getValue(value, path, state) :
      value.then ? fromPromise(value, path, input) && state.value :
      value.subscribe ? fromObservable(value, path, input) && state.value :
      state.value;
  }

  return [
    demoMiddleware,
    actionRequestMiddleware,
    valueTypesMiddleware,
  ];
}
