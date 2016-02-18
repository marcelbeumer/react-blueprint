/* eslint no-nested-ternary:0 */
export default function reducer(state, action = {}) {
  const { type, payload } = action;
  return type === 'SET_GREETING' ? state.set('greeting', payload) :
    state;
}
