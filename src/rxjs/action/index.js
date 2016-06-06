// @flow
import { Observable } from 'rxjs';
import { setScreen } from './screen';
import { setListStart, setListEnd, setListRange } from './list';
import { showBackground, hideBackground } from './background';
import * as listActions from './list';

class ActionRequest {
  type: string;
  name: string;
  args: Array<any>;

  constructor(name, ...args) {
    this.type = 'ACTION_REQUEST';
    this.name = name;
    this.args = args;
  }
}

function scopeAction(handler, path, ...others) {
  // return function(getState, ...o
}

function scope(handlers, path, ...others) {
  [].concat(handlers).forEach(handler => scopeAction(handler, path, ...others));
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

    // but what about triggering things outside of this scope?
    // dispatch action request?
    // observer.next({ type: 'actionRequest', name: 'setFoo', args: []});
    // ..or
    // observer.next(new ActionRequest('setFoo', 12);
    // ...scope(listActions, 'list', 'settings.maxSize'),

    setScreen,
    setListStart,
    setListEnd,
    setListRange,
    showBackground,
    hideBackground,
  };
}
