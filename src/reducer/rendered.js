/* eslint no-nested-ternary:0 */
export default function renderedReducer(state, action = {}) {
  const { type, payload } = action;
  return type === 'SET_RENDERED_URL' ? state.set('renderedUrl', payload) :
    state;
}
