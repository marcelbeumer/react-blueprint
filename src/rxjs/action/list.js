// @flow
/* eslint no-nested-ternary:0 */
import DataTree from '../../data/tree';
const { min, max } = Math;
const minGap = 2;

function getStart(start, state, gap = minGap) {
  return min(max(start, 0), state.list.length - gap);
}

function getEnd(end, state, gap = minGap) {
  return min(max(end, gap), state.list.length);
}

export function setListStart(start: number, getState: Function): DataTree {
  const state = getState();
  let list = state.list;
  const value = getStart(start, state);

  if (value + minGap > list.end) list = list.set('end', value + minGap);

  list = list.set('start', value);
  return state.set('list', list);
}

export function setListEnd(end: number, getState: Function): DataTree {
  const state = getState();
  let list = state.list;
  const value = getEnd(end, state);

  if (value - minGap < list.start) list = list.set('start', value - minGap);

  list = list.set('end', value);
  return state.set('list', list);
}

export function setListRange(start: number, end: number, getState: Function): DataTree {
  const state = getState();
  if (start > end) return state;

  const cleanStart = getStart(start, state, (end - start));
  const cleanEnd = getEnd(end, state, (end - start));

  return state.set('list', state.list
    .set('start', cleanStart)
    .set('end', cleanEnd));
}
