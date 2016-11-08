// @flow
import React from 'react';
import StyleSheet, {px} from '../styles';
import Gestures from './Gestures';
import theme from '../theme';

const {min, max} = Math;

const styles = StyleSheet.create({
  bar: {
    height: '1em',
    backgroundColor: theme.highlightColor,
    borderRadius: px(theme.baseBorderRadius),
    margin: '0 0 5px 0',
    cursor: 'pointer',
  },
});

export default class BarMeter extends React.Component {
  props: {
    value: number,
    onChange: Function,
  }

  _root: Object;

  static defaultProps = {
    value: 1,
    onChange: () => null,
  }

  onPan:Function = (e: Object) => {
    const deltaX = e.eventDeltaX;
    if (isNaN(deltaX)) return;

    const {width} = this._root.getBoundingClientRect();
    const ratio = 1 / width;
    const {value, onChange} = this.props;

    const updatedValue = min(max(value + (deltaX * ratio), 0), 1);
    onChange(updatedValue, value);
  };

  render() {
    const {value} = this.props;
    return (
      <div ref={el => { this._root = el; }}>
        <Gestures onPan={this.onPan}>
          <div
            className={styles.bar}
            style={{
              transform: `translateX(-50%) scaleX(${value}) translateX(50%)`,
              backgroundColor: theme.highlightColor,
            }}
          />
        </Gestures>
      </div>
    );
  }
}
