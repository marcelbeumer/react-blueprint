/* eslint new-cap:0 */
import { Record } from 'immutable';
import ListData from './list';

const TreeData = Record({
  renderedUrl: null,
  screen: 'home',
  showBackground: false,
  list: new ListData({
    length: 30,
    start: 15,
    end: 18.2,
  }),
});

TreeData.fromServerData = data => {
  const values = Object.assign({}, data);
  if (values.list) values.list = new ListData(values.list);
  return TreeData(values);
};

Object.assign(TreeData.prototype, {
  toServerData() {
    return this.toJSON();
  },
});

export default TreeData;
