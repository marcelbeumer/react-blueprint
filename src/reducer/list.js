// @flow
/* eslint no-nested-ternary:0 */
import DataTree from '../data/tree';
const { min, max } = Math;
const minGap = 2;

function getStart(start, state, gap = minGap) {
  return min(max(start, 0), state.list.length - gap);
}

function getEnd(end, state, gap = minGap) {
  return min(max(end, gap), state.list.length);
}

function setListStart(start, state) {
  let list = state.list;
  const value = getStart(start, state);

  if (value + minGap > list.end) list = list.set('end', value + minGap);

  list = list.set('start', value);
  return state.set('list', list);
}

function setListEnd(end, state) {
  let list = state.list;
  const value = getEnd(end, state);

  if (value - minGap < list.start) list = list.set('start', value - minGap);

  list = list.set('end', value);
  return state.set('list', list);
}

function setListRange(start, end, state) {
  if (start > end) return state;

  const cleanStart = getStart(start, state, (end - start));
  const cleanEnd = getEnd(end, state, (end - start));

  return state.set('list', state.list
    .set('start', cleanStart)
    .set('end', cleanEnd));
}

export default function listReducer(state: DataTree, action: Object = {}): DataTree {
  const { type, payload } = action;
  return type === 'SET_LIST_START' ? setListStart(payload, state, setListEnd) :
    type === 'SET_LIST_END' ? setListEnd(payload, state, setListStart) :
    type === 'SET_LIST_RANGE' ? setListRange(payload.start, payload.end, state) :
    state;
}
