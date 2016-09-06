// @flow
import React from 'react';
import { List } from 'immutable';
import pureRender from '../pure-render';
import SliderGrippy from './grippy';
import StyleSheet from '../styles';
import theme from '../theme';
import type { Element, Component } from 'react';

export { default as SliderGrippy } from './grippy';
const { min, max } = Math;

export const styles = StyleSheet.create({
  slider: {
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
});

export default class Slider extends React.Component {
  props: {
    values: List<number>,
    onChange: Function,
    children?: any,
  };

  root: Object;

  static defaultProps = {
    values: new List(),
    onChange: () => null,
  };

  onDrag: Function = (e: Object, grippy: Component<*, *, *>) => {
    const deltaX = e.eventDeltaX;
    if (isNaN(deltaX)) return;

    const { width } = this.root.getBoundingClientRect();
    const ratio = 1 / width;
    const { value } = grippy.props;
    const updatedValue = min(max(value + (deltaX * ratio), 0), 1);
    this.changeValue(value, updatedValue, grippy);
  };

  changeValue(value: number, updatedValue: number, grippy: ?Component<*, *, *>) {
    const { values } = this.props;
    const index = values.lastIndexOf(value);
    if (index !== -1) this.props.onChange(values.set(index, updatedValue), index, updatedValue);
    if (grippy) grippy.props.onChange(updatedValue);
  }

  cloneChildren(): Array<Element<*>> {
    return React.Children.map(this.props.children, child => (
      child.type === SliderGrippy ? React.cloneElement(child, {
        onDrag: this.onDrag,
      }) :
      child));
  }

  renderValues(): List<Element<*>> {
    const { values } = this.props;
    return values.map((value, i) =>
      <SliderGrippy key={`slider-${i}`} onDrag={this.onDrag} value={value} />);
  }

  render() {
    return (
      <div className={styles.slider} ref={el => { this.root = el; }}>
        <div className={styles.line} />
        {this.cloneChildren()}
        {this.renderValues()}
      </div>
    );
  }
}

pureRender(Slider);
