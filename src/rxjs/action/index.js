// @flow
import { Observable } from '../observable';
import mapValues from 'lodash/mapValues';
import { scopeActionHandler as scope } from '..';
import { Action } from '../../rxjs';
import { setScreen } from './screen';
import { showBackground, hideBackground } from './background';
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
    showBackground,
    hideBackground,
    ...mapValues(listActions, action => scope(action, 'list')),
  };
}
