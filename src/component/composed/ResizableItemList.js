// @flow
import React from 'react';
import Scrollable from '../base/Scrollable';
import ResizableHeight from '../base/ResizableHeight';
import resizableListRangeSize from '../connector/resizableListRangeSize';
import scrollableListRange from '../connector/scrollableListRange';
import ItemList from '../connected/ItemList';
import theme from '../theme';

const ResizableListRangeEnd = resizableListRangeSize({
  unitSize: theme.itemHeight,
})(ResizableHeight);
const ScrollableListRange = scrollableListRange({
  unitSize: theme.itemHeight,
})(Scrollable);

const ResizableItemList = () => (
  <ResizableListRangeEnd>
    <ScrollableListRange height="100%">
      <ItemList />
    </ScrollableListRange>
  </ResizableListRangeEnd>
);

export default ResizableItemList;
