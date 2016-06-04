// @flow
/* eslint no-nested-ternary:0 */
import DataTree from '../../data/tree';

export default function storeReducer(state: DataTree, action: Object = {}): DataTree {
  const { type, payload } = action;
  return type === 'SET_STORE' ? state.set('store', payload) :
    state;
}
