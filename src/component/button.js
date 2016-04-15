// @flow
import React from 'react';
import pureRender from './pure-render';
import StyleSheet from './styles';
import theme from './theme';
import cx from 'classnames';

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

export default class Button extends React.Component {
  props: {
    className?: string,
    type?: string,
  };

  render() {
    const { type, className } = this.props;
    const classes = cx({
      [styles.button]: true,
      [styles.buttonInverse]: type === 'inverse',
    }, className);
    return (
      <div {...this.props} className={classes} />
    );
  }
}

pureRender(Button);
