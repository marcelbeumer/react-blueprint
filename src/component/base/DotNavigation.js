import React from 'react';
import cx from 'classnames';
import StyleSheet, { em } from '../styles';
import theme from '../theme';

const itemSize = 1;
const itemMargin = Math.round((itemSize / 6) * 10) / 10;

const styles = StyleSheet.create({
  root: {
    color: theme.textColor,
    width: '100%',
    textAlign: 'center',
  },
  item: {
    display: 'inline-block',
    width: em(itemSize),
    height: em(itemSize),
    borderRadius: em(itemSize),
    textIndent: '-300px',
    overflow: 'hidden',
    border: `2px solid ${theme.highlightColor}`,
    backgroundColor: theme.highlightColor,
    margin: `0 ${itemMargin}em`,
    cursor: 'pointer',
    transition: 'all 0.3s linear',
  },
  itemInactive: {
    backgroundColor: 'transparent',
  },
});

export type DotNavigationValue = any;
export type DotNavigationPropTypes = {
  values: Array<DotNavigationValue>,
  value: DotNavigationValue,
  onChange?: Function,
};

const DotNavigation = ({ value, values, onChange }: DotNavigationPropTypes) => (
  <div className={styles.root}>
    {values.map((itemValue) =>
      <div
        key={itemValue}
        className={cx(styles.item, itemValue !== value && styles.itemInactive)}
        onClick={() => { if (itemValue !== value && onChange) onChange(itemValue); }}
      />
    )}
  </div>
);

export default DotNavigation;
