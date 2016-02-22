/* eslint new-cap:0 */
import { Record, List } from 'immutable';
import { generateDots } from './util';
import Dot from './dot';

const TreeData = Record({
  dots: generateDots(10),
  greeting: 'Hello world',
});

global.TreeData = TreeData;

TreeData.fromServerData = data => new TreeData({
  dots: List((data.dots || []).map(dot => new Dot(dot))),
});

TreeData.prototype.toServerData = function () {
  return this.toJSON();
};

export default TreeData;
