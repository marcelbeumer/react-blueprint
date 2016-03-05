import React from 'react';
import { List } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import pureRender from 'pure-render-decorator';
import autobind from 'autobind-decorator';
import refs from '../refs-decorator';
import BarMeterItem from './item';

export BarMeterItem from './item';

const { min, max } = Math;
const { number, func, array } = React.PropTypes;
const { listOf } = ImmutablePropTypes;

@refs
@pureRender
export default class BarMeter extends React.Component {

  static propTypes = {
    children: array,
    values: listOf(number),
    onChange: func,
  }

  static defaultProps = {
    values: new List(),
    onChange: () => null,
  }

  @autobind
  onDrag(e, ui, item) {
    const { deltaX } = ui.position;
    if (isNaN(deltaX)) return;

    const { width } = this._root.getBoundingClientRect();
    const ratio = 1 / width;
    const { value } = item.props;

    const updatedValue = min(max(value + (deltaX * ratio), 0), 1);
    this.changeValue(value, updatedValue, item);
  }

  changeValue(value, updatedValue, item) {
    const { values } = this.props;
    const index = values.lastIndexOf(value);
    if (index !== -1) this.props.onChange(values.set(index, updatedValue), index, updatedValue);
    if (item) item.props.onChange(updatedValue);
  }

  cloneChildren() {
    return React.Children.map(this.props.children, child =>
      child.type === BarMeterItem ? React.cloneElement(child, {
        onDrag: this.onDrag,
      }) :
      child);
  }

  renderValues() {
    const { values } = this.props;
    return values.map((value, i) =>
      <BarMeterItem key={`bar-${i}`} value={value} onDrag={this.onDrag} />);
  }

  render() {
    return (
      <div ref={this.onRef('_root')}>
        {this.cloneChildren()}
        {this.renderValues()}
      </div>
    );
  }
}
