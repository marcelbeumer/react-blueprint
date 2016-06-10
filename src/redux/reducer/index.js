// @flow
import DataTree from '../../data/tree';
import screenReducer from './screen';
import listReducer from './list';
import storeReducer from './store';

export default function reducer(state: DataTree, action: Object = {}): DataTree {
  return [
    storeReducer,
    screenReducer,
    listReducer,
  ].reduce((lastState, currentReducer) =>
    currentReducer(lastState, action), state);
}
