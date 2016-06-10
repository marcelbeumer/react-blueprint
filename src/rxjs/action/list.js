// @flow
import ListData from '../../data/list';
import { Observable, Action } from '..';
import { scopeActionHandler as scope } from '..';
const { min, max } = Math;
const minGap = 2;

function getStart(start, list, gap = minGap) {
  return min(max(start, 0), list.length - gap);
}

function getEnd(end, list, gap = minGap) {
  return min(max(end, gap), list.length);
}

export function setListStart(getList: Function, start: number): ListData {
  let list = getList();
  const value = getStart(start, list);

  if (value + minGap > list.end) list = list.set('end', value + minGap);

  return list.set('start', value);
}

export function setListEnd(getList: Function, end: number): ListData {
  let list = getList();
  const value = getEnd(end, list);

  if (value - minGap < list.start) list = list.set('start', value - minGap);

  return list.set('end', value);
}

export function setListRange(getList: Function, start: number, end: number): ListData {
  const list = getList();
  if (start > end) return list;

  const cleanStart = getStart(start, list, (end - start));
  const cleanEnd = getEnd(end, list, (end - start));

  return list
    .set('start', cleanStart)
    .set('end', cleanEnd);
}

export function incrementListLength(getList: Function, amount: number): ListData {
  const list = getList();
  const current = list.get('length');
  return list.set('length', current + amount);
}

export function loadMoreListItems(getState: Function): any {
  return Observable.create(observable => {
    observable.next(getState().set('listLoading', true));
    let chunksDone = 0;

    const loadChunk = () => {
      observable.next(getState().set('listLoadingProgress', chunksDone / 5));
      chunksDone++;

      if (chunksDone <= 5) {
        global.setTimeout(loadChunk, 250);
      } else {
        observable.next(getState().set('listLoading', false));
        observable.next(new Action('incrementListLength', 20));
        observable.complete();
      }
    };

    loadChunk();
  });
}

scope(setListStart, 'list');
scope(setListEnd, 'list');
scope(setListRange, 'list');
scope(incrementListLength, 'list');
scope(loadMoreListItems);
