// @flow
import DataTree from '../../data/tree';
import screenReducer from './screen';
import listReducer from './list';

export default function reducer(state: DataTree, action: Object = {}): DataTree {
  return [
    screenReducer,
    listReducer,
  ].reduce((lastState, currentReducer) =>
    currentReducer(lastState, action), state);
}
