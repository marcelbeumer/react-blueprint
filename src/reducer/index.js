/* eslint no-nested-ternary:0 */
export default function reducer(state, action = {}) {
  const { type } = action;
  return type === 'SET_TEST' ? state.set('test', action.value) :
    type === 'SET_NAME' ? state.set('name', action.payload) :
    state;
}
