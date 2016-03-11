const createSimpleAction = type => payload => ({ type, payload });

export default function createActions(getRouter = () => null) {
  return {
    setUrl: (url, title) => {
      getRouter().setUrl(url, title);
    },
    setScreen: createSimpleAction('SET_SCREEN'),
    setListStart: createSimpleAction('SET_LIST_START'),
    setListEnd: createSimpleAction('SET_LIST_END'),
    setListRange: (start, end) => ({
      type: 'SET_LIST_RANGE',
      payload: { start, end },
    }),
    showBackground: () => ({ type: 'SHOW_BACKGROUND' }),
    hideBackground: () => ({ type: 'HIDE_BACKGROUND' }),
  };
}
