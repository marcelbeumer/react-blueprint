// @flow
/* eslint new-cap:0 */
import { Record } from 'immutable';
import ListData from './list';

const TreeData = Record({
  store: 'rxjs',
  screen: null,
  showBackground: false,
  counter: 0,
  listLoading: false,
  listLoadingProgress: 0,
  list: new ListData({
    length: 30,
    start: 15,
    end: 18.2,
  }),
});

TreeData.fromServerData = (data: Object) => {
  const values = Object.assign({}, data);
  if (values.list) values.list = new ListData(values.list);
  return TreeData(values);
};

Object.assign(TreeData.prototype, {
  toServerData(): Object {
    return this.toJSON();
  },
});

export default TreeData;
