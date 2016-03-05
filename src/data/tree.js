/* eslint new-cap:0 */
import { Record } from 'immutable';
import ListData from './list';

const TreeData = Record({
  screen: 'home',
  showBackground: false,
  list: new ListData({
    length: 30,
    start: 13,
    end: 16.2,
  }),
});

TreeData.fromServerData = data => {
  const values = Object.assign({}, data);
  if (values.list) values.list = new ListData(values.list);
  return TreeData(values);
};

TreeData.prototype.toServerData = function () {
  return this.toJSON();
};

export default TreeData;
