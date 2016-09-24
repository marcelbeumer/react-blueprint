import React from 'react';
import StyleSheet, { px } from '../styles';
import Gestures from './Gestures';
import theme from '../theme';

const { min, max } = Math;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    position: 'relative',
    minHeight: '50px',
  },
  line: {
    position: 'absolute',
    top: '50%',
    width: '100%',
    height: '0',
    border: `1px solid ${theme.primaryBorderColor}`,
    borderWidth: '1px 0 0 0',
  },
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

export type SliderPropTypes = {
  values: Array<any>,
  onChange?: Function,
};

export default class Slider extends React.Component {
  props: {
    values: Array<number>,
    onChange?: Function<Array<number>, number, number>
  }

  _root: Object;

  onPan = (e: Object, value, index) => {
    const deltaX = e.eventDeltaX;
    if (isNaN(deltaX)) return;

    const { width } = this._root.getBoundingClientRect();
    const ratio = 1 / width;
    const { values, onChange } = this.props;
    const updatedValue = min(max(value + (deltaX * ratio), 0), 1);
    const updatedValues = [].concat(values);
    updatedValues[index] = updatedValue;
    if (onChange) onChange(updatedValues, updatedValue, index);
  }

  renderGrippy(value, index) {
    return (
      <Gestures key={index} onPan={(e) => this.onPan(e, value, index)}>
        <div className={styles.grippy} style={{ left: `${value * 100}%` }} />
      </Gestures>
    );
  }

  render() {
    const { values } = this.props;
    return (
      <div className={styles.root} ref={el => { this._root = el; }}>
        <div className={styles.line} />
        { values.map((value, index) => this.renderGrippy(value, index)) }
      </div>
    );
  }
}
