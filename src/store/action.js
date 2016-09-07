// @flow
const createSimpleAction = type => payload => ({ type, payload });

function loadMoreListItems() {
  return (dispatch) => {
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

export default function createActions(actionServices: Object): Object {
  return {
    setUrl: url => {
      actionServices.setUrl(url);
    },
    setScreen: createSimpleAction('SET_SCREEN'),
    setListStart: createSimpleAction('SET_LIST_START'),
    setListEnd: createSimpleAction('SET_LIST_END'),
    setListRange: (start, end) => ({
      type: 'SET_LIST_RANGE',
      payload: { start, end },
    }),
    loadMoreListItems,
  };
}
