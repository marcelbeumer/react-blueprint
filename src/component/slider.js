import React from 'react';
import { List } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import pureRender from 'pure-render-decorator';
import autobind from 'autobind-decorator';
import SliderGrippy from './slider-grippy';
import StyleSheet from './styles';
import theme from './theme';

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
    height: '1px',
    border: `1px solid ${theme.primaryBorderColor}`,
    borderWidth: '1px 0 0',
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
      <div className={styles.slider} ref={this.onRootRef}>
        <div className={styles.line}/>
        {this.cloneChildren()}
        {this.renderValues()}
      </div>
    );
  }
}
