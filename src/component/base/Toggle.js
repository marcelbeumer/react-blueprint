import React from 'react';
import cx from 'classnames';
import StyleSheet from '../styles';
import theme from '../theme';

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    borderRadius: theme.baseBorderRadius,
    overflow: 'hidden',
  },
  item: {
    flex: 1,
    display: 'inline-block',
    color: theme.textColor,
    backgroundColor: theme.inactiveBackgroundColor,
    padding: '5px 12px',
    cursor: 'pointer',
    textAlign: 'center',
  },
  activeItem: {
    color: theme.inverseTextColor,
    backgroundColor: theme.highlightColor,
  },
});

export type ToggleValue = any;
export type ToggleLabel = string;

export type TogglePropTypes = {
  value: ToggleValue,
  values: Array<ToggleValue>,
  labels?: Array<ToggleLabel>,
  onChange?: Function,
};

const Toggle = ({value, values, labels = [], onChange}: TogglePropTypes) => (
  <div className={styles.wrapper}>
    {values.map((itemValue, x) =>
      <div
        key={itemValue}
        className={cx(styles.item, itemValue === value && styles.activeItem)}
        onClick={() => { if (itemValue !== value && onChange) onChange(itemValue); }}
      >
        { labels[x] || itemValue }
      </div>
    )}
  </div>
);

export default Toggle;
