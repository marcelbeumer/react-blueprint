const createSimpleAction = type => payload => ({ type, payload });

export const setListStart = createSimpleAction('SET_LIST_START');
export const setListEnd = createSimpleAction('SET_LIST_END');

export const setListRange = (start, end) => ({
  type: 'SET_LIST_RANGE',
  payload: { start, end },
});

export const showBackground = () => ({ type: 'SHOW_BACKGROUND' });
export const hideBackground = () => ({ type: 'HIDE_BACKGROUND' });
