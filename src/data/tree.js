/* eslint new-cap:0 */
import { Record } from 'immutable';

const TreeData = Record({
  greeting: 'Hello world',
});

TreeData.fromServerData = data => new TreeData(data);

TreeData.prototype.toServerData = function () {
  return this.toJSON();
};

export default TreeData;
