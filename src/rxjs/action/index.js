// @flow
import { Observable } from 'rxjs';
import { setScreen } from './screen';
import { setListStart, setListEnd, setListRange } from './list';
import { showBackground, hideBackground } from './background';

export default function createActionHandlers(actionServices: Object): Object {
  return {
    demoMiddleware: () => '__MIDDLEWARE_DEMO__',

    demoObserverable: getState =>
      Observable.interval(1000).take(5).map(() =>
        getState().set('counter', getState().get('counter') + 1)),

    setUrl: (getState, url) => {
      actionServices.setUrl(url);
    },

    setStore: (getState, storeType) => {
      actionServices.setStore(storeType);
      return getState().set('store', storeType);
    },

    setScreen,
    setListStart,
    setListEnd,
    setListRange,
    showBackground,
    hideBackground,
  };
}
