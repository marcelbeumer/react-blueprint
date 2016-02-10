import { Record } from 'immutable';

const DataTree = Record({ // eslint-disable-line new-cap
  example: true,
  name: 'world',
  test: null,
});

DataTree.fromServerData = data => DataTree(data); // eslint-disable-line new-cap

export default DataTree;
