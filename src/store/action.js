// @flow
const createSimpleAction = type => (payload: any) => ({ type, payload });

export function loadMoreListItems() {
  return (dispatch: Function) => {
    let chunksDone = 0;
    dispatch({ type: 'SET_LIST_LOADING', payload: true });

    const loadChunk = () => {
      dispatch({ type: 'SET_LIST_LOADING_PROGRESS', payload: chunksDone / 5 });
      chunksDone++;

      if (chunksDone <= 5) {
        global.setTimeout(loadChunk, 250);
      } else {
        dispatch({ type: 'SET_LIST_LOADING', payload: false });
        dispatch({ type: 'INCREMENT_LIST_LENGTH', payload: 20 });
      }
    };

    loadChunk();
  };
}

export const setUrl = createSimpleAction('SERVICE_SET_URL');
export const setNamedUrl = createSimpleAction('SERVICE_SET_NAMED_URL');
export const setScreen = createSimpleAction('SET_SCREEN');
export const setListStart = createSimpleAction('SET_LIST_START');
export const setListEnd = createSimpleAction('SET_LIST_END');
export const moveListRange = createSimpleAction('MOVE_LIST_RANGE');
export const setListRangeSize = createSimpleAction('SET_LIST_RANGE_SIZE');
export const setListRange = (start: number, end: number) => ({
  type: 'SET_LIST_RANGE',
  payload: { start, end },
});
