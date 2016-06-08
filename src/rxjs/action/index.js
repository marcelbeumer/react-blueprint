// @flow
import { Observable } from 'rxjs';
import forEach from 'lodash/forEach';
import { scopeActionHandler } from '..';
import { ActionRequest } from '../middleware';
import { setScreen } from './screen';
import { showBackground, hideBackground } from './background';
import * as listActions from './list';

forEach(listActions, action => scopeActionHandler(action, 'list'));

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
    ...listActions,
  };
}
