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
});

export default class Button extends React.Component {
  props: {
    className?: string,
  };

  render() {
    const { className } = this.props;
    return (
      <div {...this.props} className={cx(styles.button, className)} />
    );
  }
}

pureRender(Button);
