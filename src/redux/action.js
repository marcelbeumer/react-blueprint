// @flow
const createSimpleAction = type => payload => ({ type, payload });

export default function createActions(actionServices: Object): Object {
  return {
    setUrl: url => {
      actionServices.setUrl(url);
    },
    setStore: storeType => {
      actionServices.setStore(storeType);
      return { type: 'SET_STORE', payload: storeType };
    },
    setScreen: createSimpleAction('SET_SCREEN'),
    setListStart: createSimpleAction('SET_LIST_START'),
    setListEnd: createSimpleAction('SET_LIST_END'),
    setListRange: (start, end) => ({
      type: 'SET_LIST_RANGE',
      payload: { start, end },
    }),
  };
}
