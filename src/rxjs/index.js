// @flow
import { Subject, BehaviorSubject } from './observable';
import { Collection } from 'immutable';
import mapValues from 'lodash/mapValues';
import createActionHandlers from './action';
import createMiddleware from './middleware';

export type Store = {state: any, input: any, actions: Object};

export class Action {
  name: string;
  args: Array<any>;
  constructor(name: string, ...args: Array<any>) {
    this.name = name;
    this.args = args;
  }
}

export class ExternalAction extends Action { }

const getGetters = ({ path, others }, state) => [
  path ? () => state.value.getIn(path.split('.')) : () => state.value,
  ...(others || [])
    .map(otherPath => () => state.value.getIn(otherPath.split('.'))),
];

function bindActionHandlers(actionHandlers, input, state) {
  return mapValues(actionHandlers, (handler) => {
    const getters = getGetters(handler, state);
    return (...actionArgs) => ({
      path: handler.path,
      value: handler(...getters, ...actionArgs),
    });
  });
}

function createActions(actionHandlers, input) {
  return mapValues(actionHandlers, (handler, name) =>
    (...actionArgs) => {
      input.next({ value: new ExternalAction(name, ...actionArgs) });
    }
  );
}

function mapMiddleware(input, middleware) {
  return middleware.reduce((subject, handler) =>
    subject.map((value) => handler(value) || {}), input);
}

export function scopeActionHandler(
  handler: Function,
  path: string,
  others: ?Array<string>) {
  return Object.assign((...args) => handler(...args), { path, others });
}

export default function createStore(
  initialState: Collection,
  actionServices: Object,
): Store {
  const state = new BehaviorSubject(initialState);
  const input = new Subject();
  const actionHandlers = createActionHandlers(actionServices);
  const actions = createActions(actionHandlers, input);
  const boundHandlers = bindActionHandlers(actionHandlers, input, state);
  const middleware = createMiddleware(input, state, boundHandlers);

  mapMiddleware(input, middleware)
    .distinctUntilChanged()
    .subscribe(state);

  return { state, input, actions };
}
