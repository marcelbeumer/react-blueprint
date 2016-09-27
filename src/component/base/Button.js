import React from 'react';
import cx from 'classnames';
import StyleSheet from '../styles';
import theme from '../theme';

const styles = StyleSheet.create({
  button: {
    display: 'inline-block',
    color: theme.inverseTextColor,
    backgroundColor: theme.highlightColor,
    padding: '5px 20px',
    borderRadius: theme.baseBorderRadius,
    cursor: 'pointer',
  },
  disabled: {
    backgroundColor: theme.inactiveBackgroundColor,
  },
});

const Button = ({ disabled, children, ...others }: { disabled: bool, children: any }) =>
  <div
    className={cx(styles.button, disabled && styles.disabled)}
    {...others}
  >
    { children }
  </div>;

export default Button;
