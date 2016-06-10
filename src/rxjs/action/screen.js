// @flow
import DataTree from '../../data/tree';

export const setScreen = (getState: Function, name: string): DataTree =>
  getState().set('screen', name);
