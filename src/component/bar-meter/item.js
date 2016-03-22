import React from 'react';
import Gestures from '../gestures';
import pureRender from 'pure-render-decorator';
import autobind from 'autobind-decorator';
import StyleSheet, { px } from '../styles';
import theme from '../theme';

const { number, func } = React.PropTypes;
const barColor = theme.highlightColor;

export const styles = StyleSheet.create({
  bar: {
    height: '1em',
    backgroundColor: barColor,
    borderRadius: px(theme.baseBorderRadius),
    margin: '0 0 5px 0',
    cursor: 'pointer',
  },
});

@pureRender
export default class BarMeterItem extends React.Component {
  static propTypes = {
    value: number,
    onDrag: func,
    onChange: func,
  }

  static defaultProps = {
    value: 0,
    onDrag: () => null,
    onChange: () => null,
  }

  @autobind
  onPan(e) {
    this.props.onDrag(e, this);
  }

  render() {
    const { value } = this.props;
    return (
      <Gestures onPan={this.onPan}>
        <div className={styles.bar} style={{
          transform: `translateX(-50%) scaleX(${value}) translateX(50%)`,
          backgroundColor: barColor,
        }}
        />
      </Gestures>
    );
  }
}
