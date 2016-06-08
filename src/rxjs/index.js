// @flow
import { Subject, BehaviorSubject } from 'rxjs';
import { Collection } from 'immutable';
import mapValues from 'lodash/mapValues';
import createDebug from 'debug';
import createActionHandlers from './action';
import createMiddleware from './middleware';

export type RxJsStore = {state: any, input: any, actions: Object};

const debug = createDebug('rxjs');

function createActions(actionHandlers, input, state) {
  return mapValues(actionHandlers, (handler, name) => {
    const { path } = handler;
    const getters = [
      path ? () => state.value.getIn(path.split('.')) : () => state.value,
      ...(handler.others || [])
        .map(otherPath => () => state.value.getIn(otherPath.split('.'))),
    ];

    return (...actionArgs) => {
      debug(`action call ${name}`);
      input.next({
        value: handler(...getters, ...actionArgs),
        path,
      });
    };
  });
}

function mapMiddleware(input, middleware) {
  return middleware.reduce((subject, handler) =>
    subject.map((value) => handler(value)), input);
}

export function scopeActionHandler(
  handler: Function,
  path: string,
  others: ?Array<string>) {
  return Object.assign((...args) => handler(...args), { path, others });
}

export default function createRxJsStore(
  initialState: Collection,
  actionServices: Object,
): RxJsStore {
  const state = new BehaviorSubject(initialState);
  const input = new Subject();
  const actionHandlers = createActionHandlers(actionServices);
  const actions = createActions(actionHandlers, input, state);
  const middleware = createMiddleware(input, state, actions);

  mapMiddleware(input, middleware)
    .distinctUntilChanged()
    .subscribe(state);

  return { state, input, actions };
}
