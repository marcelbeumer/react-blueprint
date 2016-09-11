// @flow
import React from 'react';
import Gestures from '../gestures';
import pureRender from '../pure-render';
import StyleSheet, { px } from '../styles';
import theme from '../theme';

export const styles = StyleSheet.create({
  grippy: {
    position: 'absolute',
    width: '15px',
    height: '34px',
    top: 'calc(50% - 17px)',
    transform: 'translate(-50%)',
    borderRadius: px(theme.baseBorderRadius),
    backgroundColor: theme.highlightColor,
    cursor: 'pointer',
  },
});

export default class SliderGrippy extends React.Component {
  props: {
    value: number,
    onDrag: Function,
  };

  static defaultProps = {
    value: 0,
    onDrag: () => null,
  };

  onPan:Function = (e: Object) => {
    this.props.onDrag(e, this);
  };

  render() {
    const { value } = this.props;
    return (
      <Gestures onPan={this.onPan}>
        <div className={styles.grippy} style={{ left: `${value * 100}%` }} />
      </Gestures>
    );
  }
}

pureRender(SliderGrippy);
