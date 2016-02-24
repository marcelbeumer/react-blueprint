/* eslint new-cap:0 */
import { Record, List } from 'immutable';
import { generateDots, generateBars, generateSliderValues } from './util';
import Dot from './dot';
import Bar from './bar';

const TreeData = Record({
  dots: generateDots(10),
  bars: generateBars(5),
  sliders: generateSliderValues(2),
  resizableContentHeight: 200,
  greeting: 'Hello world',
});

global.TreeData = TreeData;

TreeData.fromServerData = data => new TreeData({
  dots: List((data.dots || []).map(dot => new Dot(dot))),
  bars: List((data.bars || []).map(bar => new Bar(bar))),
  sliders: List(data.sliders || []),
});

TreeData.prototype.toServerData = function () {
  return this.toJSON();
};

export default TreeData;
