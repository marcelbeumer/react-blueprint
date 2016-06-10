// @flow
import { Observable, Action } from '../../rxjs';
import { scopeActionHandler as scope } from '..';
import { setScreen } from './screen';
import {
  setListStart,
  setListEnd,
  setListRange,
  loadMoreListItems,
} from './list';

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
    setListStart: scope(setListStart, 'list'),
    setListEnd: scope(setListEnd, 'list'),
    setListRange: scope(setListRange, 'list'),
    loadMoreListItems,
  };
}
