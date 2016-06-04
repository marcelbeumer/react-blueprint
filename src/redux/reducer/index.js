// @flow
import DataTree from '../../data/tree';
import screenReducer from './screen';
import backgroundReducer from './background';
import listReducer from './list';

export default function reducer(state: DataTree, action: Object = {}): DataTree {
  return [
    screenReducer,
    backgroundReducer,
    listReducer,
  ].reduce((lastState, currentReducer) =>
    currentReducer(lastState, action), state);
}
