// @flow
// import { Observable } from 'rxjs/Observable';

// const setScreen = (name, getState) =>
//   Observable.create(observer => {
//     observer.next(getState().set('screen', name));
//     observer.complete();
//   });
import { setScreen } from './screen';
import { setListStart, setListEnd, setListRange } from './list';
import { showBackground, hideBackground } from './background';

export default function createActionHandlers(actionServices: Object): Object {
  return {
    setUrl: url => {
      actionServices.setUrl(url);
    },
    setScreen,
    setListStart,
    setListEnd,
    setListRange,
    showBackground,
    hideBackground,
  };
}
