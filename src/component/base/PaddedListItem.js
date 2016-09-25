// @flow
import React from 'react';
import StyleSheet from '../styles';

const itemMargin = 2;

export const styles = StyleSheet.create({
  paddedListItem: {
    height: '1em',
    padding: `0 0 ${itemMargin}px 0`,
    display: 'flex',
  },
});

type PaddedListItemPropTypes = {
  children?: any,
  height?: string,
};

const PaddedListItem = ({ height = 'auto', children }: PaddedListItemPropTypes) =>
  <div className={styles.paddedListItem} style={{ height }}>{children}</div>;

export default PaddedListItem;
