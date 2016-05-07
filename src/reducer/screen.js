// @flow
/* eslint no-nested-ternary:0 */
import DataTree from '../data/tree';

export default function screenReducer(state: DataTree, action: Object = {}): DataTree {
  const { type, payload } = action;
  return type === 'SET_SCREEN' ? state.set('screen', payload) :
    state;
}
