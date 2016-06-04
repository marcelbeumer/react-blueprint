import DataTree from '../../data/tree';

export const setScreen = (name: string, getState: Function): DataTree =>
  getState().set('screen', name);
