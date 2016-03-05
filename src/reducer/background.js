/* eslint no-nested-ternary:0 */
export default function backgroundReducer(state, action = {}) {
  const { type } = action;
  return type === 'SHOW_BACKGROUND' ? state.set('showBackground', true) :
    type === 'HIDE_BACKGROUND' ? state.set('showBackground', false) :
    state;
}
