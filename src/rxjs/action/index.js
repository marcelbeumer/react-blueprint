// @flow
import { Observable } from 'rxjs';
import mapValues from 'lodash/mapValues';
import { ActionRequest } from '../middleware';
import { setScreen } from './screen';
import { showBackground, hideBackground } from './background';
import * as listActions from './list';

export function scopeAction(
  handler: Function,
  path: string,
  others: ?Array<string>): Function {
  Object.assign(handler, { path, others });
  return handler;
}

export function scopeActions(
  handlers: Object,
  path: string,
  others: ?Array<string>): Object {
  return mapValues(handlers, handler => scopeAction(handler, path, others));
}

export default function createActionHandlers(actionServices: Object): Object {
  return {
    demoMiddleware: () => '__MIDDLEWARE_DEMO__',

    demoObserverable: getState =>
      Observable.interval(1000).take(5).map(() =>
        getState().set('counter', getState().get('counter') + 1)),

    demoActionRequest: () => new ActionRequest('demoMiddleware'),

    setUrl: (getState, url) => {
      actionServices.setUrl(url);
    },

    setStore: (getState, storeType) => {
      actionServices.setStore(storeType);
      return getState().set('store', storeType);
    },

    setScreen,
    showBackground,
    hideBackground,
    ...scopeActions(listActions, 'list'),
  };
}
