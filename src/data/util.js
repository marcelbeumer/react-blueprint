/* eslint new-cap:0 */
import { List } from 'immutable';
import { range } from 'lodash';
import Dot from './dot';
import Bar from './bar';

export const generateDots = (num = 0) =>
  List(range(num).map(() => new Dot({
    x: Math.random(),
    y: Math.random(),
  })));

export const generateBars = (num = 0) =>
  List(range(num).map(() => new Bar({
    value: Math.random(),
    shade: Math.random(),
  })));

export const generateSliderValues = (num = 0) =>
  List(range(num).map(() => Math.random()));
