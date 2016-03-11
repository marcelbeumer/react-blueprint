const createSimpleAction = type => payload => ({ type, payload });

export default function createActions(history) {
  return {
    setScreen: createSimpleAction('SET_SCREEN'),
    setListStart: createSimpleAction('SET_LIST_START'),
    setListEnd: createSimpleAction('SET_LIST_END'),
    setLocation: (title, location) => {
      history.setLocation(location);
    },
    setListRange: (start, end) => ({
      type: 'SET_LIST_RANGE',
      payload: { start, end },
    }),
    showBackground: () => ({ type: 'SHOW_BACKGROUND' }),
    hideBackground: () => ({ type: 'HIDE_BACKGROUND' }),
  };
}
