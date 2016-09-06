// @flow
import React from 'react';
import pureRender from './pure-render';
import StyleSheet, { px } from './styles';
import theme from './theme';
import color from 'color';

const barColor = theme.highlightColor;

export const styles = StyleSheet.create({
  bar: {
    backgroundColor: color(barColor).alpha(0.1).rgbString(),
    height: '1em',
  },
  progress: {
    height: '1em',
    backgroundColor: barColor,
    borderRadius: px(theme.baseBorderRadius),
    transition: '0.1s ease-in-out',
    margin: '0 0 5px 0',
    cursor: 'pointer',
  },
});

export default class LoadingIndicator extends React.Component {
  props: {
    progress: number,
    active: boolean,
  };

  static defaultProps = {
    active: false,
    progress: 0,
  };

  render() {
    const { progress } = this.props;
    return (
      <div className={styles.bar} >
        <div
          className={styles.progress}
          style={{
            transform: `translateX(-50%) scaleX(${progress || 0}) translateX(50%)`,
          }}
        />
      </div>
    );
  }
}


pureRender(LoadingIndicator);
