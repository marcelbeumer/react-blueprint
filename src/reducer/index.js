export default function reducer(state, action = {}) {
  const { type } = action;
  return type === 'TEST' ? state.set('test', action.value) :
    state;
}
