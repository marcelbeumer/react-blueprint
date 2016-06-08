// @flow
import DataTree from '../../data/tree';
const { min, max } = Math;
const minGap = 2;

function getStart(start, list, gap = minGap) {
  return min(max(start, 0), list.length - gap);
}

function getEnd(end, list, gap = minGap) {
  return min(max(end, gap), list.length);
}

export function setListStart(getList: Function, start: number): DataTree {
  let list = getList();
  const value = getStart(start, list);

  if (value + minGap > list.end) list = list.set('end', value + minGap);

  return list.set('start', value);
}

export function setListEnd(getList: Function, end: number): DataTree {
  let list = getList();
  const value = getEnd(end, list);

  if (value - minGap < list.start) list = list.set('start', value - minGap);

  return list.set('end', value);
}

export function setListRange(getList: Function, start: number, end: number): DataTree {
  const list = getList();
  if (start > end) return list;

  const cleanStart = getStart(start, list, (end - start));
  const cleanEnd = getEnd(end, list, (end - start));

  return list
    .set('start', cleanStart)
    .set('end', cleanEnd);
}
