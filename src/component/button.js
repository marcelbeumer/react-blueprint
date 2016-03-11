import React from 'react';
import StyleSheet from './styles';
import theme from './theme';
import cx from 'classnames';

const { string } = React.PropTypes;

export const styles = StyleSheet.create({
  button: {
    display: 'inline-block',
    color: theme.inverseTextColor,
    backgroundColor: theme.highlightColor,
    padding: '5px 12px',
    borderRadius: theme.baseBorderRadius,
    cursor: 'pointer',
  },
  buttonInverse: {
    color: theme.textColor,
    backgroundColor: theme.backgroundColor,
  },
});

export default function Button(props) {
  const { type, className } = props;
  const classes = cx({
    [styles.button]: true,
    [styles.buttonInverse]: type === 'inverse',
  }, className);
  return (
    <div {...props} className={classes} />
  );
}

Button.propTypes = {
  className: string,
  type: string,
};
