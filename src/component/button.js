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
    padding: '5px 20px',
    borderRadius: theme.baseBorderRadius,
    cursor: 'pointer',
  },
  inactive: {
    opacity: 0.5,
  },
});

export default class Button extends React.Component {
  props: {
    className?: string,
    active?: boolean,
  };

  static defaultProps = {
    active: true,
  };

  render() {
    const { className, active } = this.props;
    return (
      <div {...this.props} className={cx(styles.button, !active && styles.inactive, className)} />
    );
  }
}

pureRender(Button);
