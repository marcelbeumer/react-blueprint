// @flow
import DataTree from '../../data/tree';

export default function backgroundReducer(state: DataTree, action: Object = {}): DataTree {
  const { type } = action;
  return type === 'SHOW_BACKGROUND' ? state.set('showBackground', true) :
    type === 'HIDE_BACKGROUND' ? state.set('showBackground', false) :
    state;
}
