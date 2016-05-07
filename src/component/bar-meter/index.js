// @flow
import React from 'react';
import { List } from 'immutable';
import pureRender from '../pure-render';
import refHandler from '../ref-handler';
import BarMeterItem from './item';
import type { Element, Component } from 'react';

export { default as BarMeterItem } from './item';
const { min, max } = Math;

export default class BarMeter extends React.Component {
  props: {
    children?: any,
    values: List<number>,
    onChange: Function,
  };
  root: Object;
  refRoot: Function = refHandler(this, 'root');

  static defaultProps = {
    values: new List(),
    onChange: () => null,
  };

  onDrag:Function = (e: Object, item: Component) => {
    const deltaX = e.eventDeltaX;
    if (isNaN(deltaX)) return;

    const { width } = this.root.getBoundingClientRect();
    const ratio = 1 / width;
    const { value } = item.props;

    const updatedValue = min(max(value + (deltaX * ratio), 0), 1);
    this.changeValue(value, updatedValue, item);
  };

  changeValue(value: number, updatedValue: number, item: any) {
    const { values } = this.props;
    const index = values.lastIndexOf(value);
    if (index !== -1) this.props.onChange(values.set(index, updatedValue), index, updatedValue);
    if (item) item.props.onChange(updatedValue);
  }

  cloneChildren(): Array<Element> {
    return React.Children.map(this.props.children, child => (
      child.type === BarMeterItem ? React.cloneElement(child, {
        onDrag: this.onDrag,
      }) :
      child));
  }

  renderValues(): List<Element> {
    const { values } = this.props;
    return values.map((value, i) =>
      <BarMeterItem key={`bar-${i}`} value={value} onDrag={this.onDrag} />);
  }

  render() {
    return (
      <div ref={this.refRoot}>
        {this.cloneChildren()}
        {this.renderValues()}
      </div>
    );
  }
}

pureRender(BarMeter);
