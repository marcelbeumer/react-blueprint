// @flow
import { Subject, BehaviorSubject } from 'rxjs';
import mapValues from 'lodash/mapValues';
import createDebug from 'debug';
import createActionHandlers from './action';
import middleware from './middleware';

export type RxJsStore = {state: any, input: any, actions: Object};

const debug = createDebug('rxjs');

function createActions(actionHandlers, input, state) {
  return mapValues(actionHandlers, (handler, name) => (...actionArgs) => {
    debug(`action call ${name}`);
    input.next(handler(() => state.value, ...actionArgs));
  });
}

function createMiddleware(input, state, actions): any {
  return middleware.reduce((subject, handler) =>
    subject.map((value) => handler(value, input, state, actions)), input);
}

export default function createRxJsStore(
  initialState: any,
  actionServices: Object,
): RxJsStore {
  const state = new BehaviorSubject(initialState);
  const input = new Subject();
  const actionHandlers = createActionHandlers(actionServices);
  const actions = createActions(actionHandlers, input, state);

  createMiddleware(input, state, actions)
    .distinctUntilChanged()
    .subscribe(state);

  return { state, input, actions };
}
