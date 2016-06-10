// @flow
import mapValues from 'lodash/mapValues';
import { Observable, Action } from '../../rxjs';
import { scopeActionHandler as scope } from '..';
import { setScreen } from './screen';
import * as listActions from './list';

export default function createActionHandlers(actionServices: Object): Object {
  return {
    demoMiddleware: () => '__MIDDLEWARE_DEMO__',

    demoObserverable: getState =>
      Observable.interval(1000).take(5).map(() =>
        getState().set('counter', getState().get('counter') + 1)),

    demoActionRequest: () => new Action('demoMiddleware'),

    setUrl: (getState, url) => {
      actionServices.setUrl(url);
    },

    setStore: (getState, storeType) => {
      actionServices.setStore(storeType);
      return getState().set('store', storeType);
    },

    setScreen,
    ...mapValues(listActions, action => scope(action, 'list')),
  };
}
