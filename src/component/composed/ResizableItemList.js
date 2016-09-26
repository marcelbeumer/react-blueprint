// @flow
import React from 'react';

import Scrollable from '../base/Scrollable';
import ResizableHeight from '../base/ResizableHeight';
import listHeightResizer from '../connector/listHeightResizer';
import listStartScrollable from '../connector/listStartScrollable';
import ItemList from '../connected/ItemList';
import theme from '../theme';

const ListHeightResizer = listHeightResizer({
  unitSize: theme.itemHeight,
})(ResizableHeight);
const ScrollableListStart = listStartScrollable({
  unitSize: theme.itemHeight,
})(Scrollable);

const ResizableItemList = () => (
  <ListHeightResizer>
    <ScrollableListStart height="100%">
      <ItemList />
    </ScrollableListStart>
  </ListHeightResizer>
);

export default ResizableItemList;
