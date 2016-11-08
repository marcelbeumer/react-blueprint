// @flow
import React from 'react';
import listOfItems from '../enhancer/listOfItems';
import {px} from '../styles';
import theme from '../theme';
import LabelBox from '../base/LabelBox';
import ListContainer from '../base/ListContainer';
import PaddedListItem from '../base/PaddedListItem';

const itemFactory = (item) => (
  <PaddedListItem key={item} height={px(theme.itemHeight)}>
    <LabelBox value={item} />
  </PaddedListItem>
);

const ItemList = listOfItems(itemFactory)(ListContainer);

export default ItemList;
