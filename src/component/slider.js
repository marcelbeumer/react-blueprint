import React from 'react';
import { List } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import pureRender from 'pure-render-decorator';
import autobind from 'autobind-decorator';
import SliderGrippy from './slider-grippy';

const { func, any, number } = React.PropTypes;
const { listOf } = ImmutablePropTypes;
const { min, max } = Math;

@pureRender
export default class Slider extends React.Component {

  static propTypes = {
    values: listOf(number),
    children: any,
    onChange: func,
  }

  static defaultProps = {
    values: new List(),
    onChange: () => null,
  }

  @autobind
  onDrag(e, ui, grippy) {
    const { width, left } = this.root.getBoundingClientRect();
    const ratio = 100 / width;
    const { value } = grippy.props;
    const { clientX } = ui.position;
    const updatedValue = min(max((clientX - left) * ratio / 100, 0), 1);
    this.changeValue(value, updatedValue, grippy);
  }

  @autobind
  onRootRef(root) {
    this.root = root;
  }

  changeValue(value, updatedValue, grippy) {
    const { values } = this.props;
    this.props.onChange(values.indexOf(value), updatedValue);
    if (grippy) grippy.props.onChange(updatedValue);
  }

  cloneChildren() {
    return React.Children.map(this.props.children, child =>
      child.type === SliderGrippy ? React.cloneElement(child, { onDrag: this.onDrag }) :
      child);
  }

  renderValues() {
    const { values } = this.props;
    return values.map((value, i) =>
      <SliderGrippy key={`slider-${i}`} onDrag={this.onDrag} value={value}/>);
  }

  render() {
    return (
      <div className="slider" ref={this.onRootRef}>
        <div className="slider--line"/>
        {this.cloneChildren()}
        {this.renderValues()}
      </div>
    );
  }
}
