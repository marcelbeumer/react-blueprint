/* eslint no-nested-ternary:0 */
export default function screenReducer(state, action = {}) {
  const { type, payload } = action;
  return type === 'SET_SCREEN' ? state.set('screen', payload) :
    state;
}
