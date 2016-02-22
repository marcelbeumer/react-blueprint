/* eslint new-cap:0 */
import { List } from 'immutable';
import { range } from 'lodash';
import Dot from './dot';

export const generateDots = (num = 0) =>
  List(range(num).map(() => new Dot({
    x: Math.random(),
    y: Math.random(),
  })));
