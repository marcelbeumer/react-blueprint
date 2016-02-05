/* eslint no-nested-ternary:0 */
export default function reducer(state, action = {}) {
  const { type, payload } = action;
  return type === 'SET_TEST' ? state.set('test', payload) :
    type === 'SET_NAME' ? state.set('name', payload) :
    state;
}
