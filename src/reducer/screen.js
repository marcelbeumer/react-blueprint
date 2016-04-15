// @flow
/* eslint no-nested-ternary:0 */
import Collection from 'immutable';

export default function screenReducer(state: Collection, action: Object = {}): Collection {
  const { type, payload } = action;
  return type === 'SET_SCREEN' ? state.set('screen', payload) :
    state;
}
