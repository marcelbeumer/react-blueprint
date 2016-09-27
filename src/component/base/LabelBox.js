// @flow
import React from 'react';
import StyleSheet, { px } from '../styles';
import theme from '../theme';

export const styles = StyleSheet.create({
  item: {
    flex: 1,
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: px(theme.baseBorderRadius),
    backgroundColor: theme.highlightColor,
    color: theme.inverseTextColor,
    fontWeight: 'bold',
  },
});

type LabelBoxPropTypes = { value: any };

const LabelBox = ({ value }: LabelBoxPropTypes) => (
  <div className={styles.item}>{value}</div>
);

export default LabelBox;
