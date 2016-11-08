// @flow
import DataTree from '../../data/tree';

const {min, max} = Math;
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
  if (start > end || (end - start <= minGap)) return state;

  const cleanStart = getStart(start, state);
  const cleanEnd = getEnd(end, state);

  return state.set('list', state.list
    .set('start', cleanStart)
    .set('end', cleanEnd));
}

function moveListRange(start, state) {
  const {list} = state;
  const cleanStart = getStart(start, state);
  const cleanEnd = getEnd(start + (list.end - list.start), state);

  if (cleanEnd >= list.length) return state;

  return state.set('list', list
    .set('start', cleanStart)
    .set('end', cleanEnd));
}

function setListRangeSize(size, state) {
  const cleanEnd = getEnd(state.list.start + size, state);
  return state.setIn(['list', 'end'], cleanEnd);
}

function incrementListLenght(amount, state) {
  const path = ['list', 'length'];
  const current = state.getIn(path);
  return state.setIn(path, current + amount);
}

export default function listReducer(state: DataTree, action: Object = {}): DataTree {
  const {type, payload} = action;
  return type === 'SET_LIST_START' ? setListStart(payload, state, setListEnd) :
    type === 'SET_LIST_END' ? setListEnd(payload, state, setListStart) :
    type === 'SET_LIST_RANGE' ? setListRange(payload.start, payload.end, state) :
    type === 'MOVE_LIST_RANGE' ? moveListRange(payload, state) :
    type === 'SET_LIST_RANGE_SIZE' ? setListRangeSize(payload, state) :
    type === 'SET_LIST_LOADING' ? state.set('listLoading', Boolean(payload)) :
    type === 'SET_LIST_LOADING_PROGRESS' ? state.set('listLoadingProgress', payload) :
    type === 'INCREMENT_LIST_LENGTH' ? incrementListLenght(payload, state) :
    state;
}
