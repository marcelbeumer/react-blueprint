// @flow
import DataTree from '../../data/tree';

export const showBackground = (getState: Function): DataTree =>
  getState().set('showBackground', true);

export const hideBackground = (getState: Function): DataTree =>
  getState().set('showBackground', false);
