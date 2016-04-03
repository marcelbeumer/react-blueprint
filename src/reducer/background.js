// @flow
/* eslint no-nested-ternary:0 */
import Collection from 'immutable';

export default function backgroundReducer(state: Collection, action: Object = {}): Collection {
  const { type } = action;
  return type === 'SHOW_BACKGROUND' ? state.set('showBackground', true) :
    type === 'HIDE_BACKGROUND' ? state.set('showBackground', false) :
    state;
}
