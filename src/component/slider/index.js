import React from 'react';
import { List } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import pureRender from 'pure-render-decorator';
import autobind from 'autobind-decorator';
import refHandler from '../ref-handler';
import SliderGrippy from './grippy';
import StyleSheet from '../styles';
import theme from '../theme';

export SliderGrippy from './grippy';

const { func, any, number } = React.PropTypes;
const { listOf } = ImmutablePropTypes;
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
  onDrag(e, grippy) {
    const deltaX = e.eventDeltaX;
    if (isNaN(deltaX)) return;

    const { width } = this._root.getBoundingClientRect();
    const ratio = 1 / width;
    const { value } = grippy.props;
    const updatedValue = min(max(value + (deltaX * ratio), 0), 1);
    this.changeValue(value, updatedValue, grippy);
  }

  refRoot = refHandler(this, '_root');

  changeValue(value, updatedValue, grippy) {
    const { values } = this.props;
    const index = values.lastIndexOf(value);
    if (index !== -1) this.props.onChange(values.set(index, updatedValue), index, updatedValue);
    if (grippy) grippy.props.onChange(updatedValue);
  }

  cloneChildren() {
    return React.Children.map(this.props.children, child =>
      child.type === SliderGrippy ? React.cloneElement(child, {
        onDrag: this.onDrag,
      }) :
      child);
  }

  renderValues() {
    const { values } = this.props;
    return values.map((value, i) =>
      <SliderGrippy key={`slider-${i}`} onDrag={this.onDrag} value={value} />);
  }

  render() {
    return (
      <div className={styles.slider} ref={this.refRoot}>
        <div className={styles.line} />
        {this.cloneChildren()}
        {this.renderValues()}
      </div>
    );
  }
}
