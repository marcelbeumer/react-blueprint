import React from 'react';
import Hammer from 'react-hammerjs';
import pureRender from 'pure-render-decorator';
import autobind from 'autobind-decorator';
import StyleSheet, { px } from '../styles';
import theme from '../theme';

const { number, func } = React.PropTypes;
const barColor = theme.highlightColor;

export const styles = StyleSheet.create({
  bar: {
    height: '1em',
    borderRadius: px(theme.baseBorderRadius),
    margin: '0 0 5px 0',
    cursor: 'pointer',
  },
});

const hammerOptions = {
  recognizers: {
    pan: {
      threshold: 0,
    },
  },
};

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
    this._panX = this._panX || 0;
    const deltaX = e.deltaX - this._panX;
    this._panX = e.deltaX;
    this.props.onDrag(e, deltaX, this);
  }

  @autobind
  onPanEnd() {
    delete this._panX;
  }

  render() {
    const { value } = this.props;
    return (
      <Hammer options={hammerOptions} onPan={this.onPan} onPanEnd={this.onPanEnd}>
        <div className={styles.bar} style={{
          transform: `translateX(-50%) scaleX(${value}) translateX(50%)`,
          backgroundColor: barColor,
        }}
        />
      </Hammer>
    );
  }
}
