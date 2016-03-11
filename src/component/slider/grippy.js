import React from 'react';
import Hammer from 'react-hammerjs';
import pureRender from 'pure-render-decorator';
import autobind from 'autobind-decorator';
import StyleSheet, { px } from '../styles';
import theme from '../theme';

const { number, func } = React.PropTypes;

export const styles = StyleSheet.create({
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

const hammerOptions = {
  recognizers: {
    pan: {
      threshold: 0,
    },
  },
};

@pureRender
export default class SliderGrippy extends React.Component {
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

  state = {
    panX: 0,
  }

  @autobind
  onPan(e) {
    const deltaX = e.deltaX - this.state.panX;
    this.state.panX = e.deltaX;
    this.props.onDrag(e, deltaX, this);
  }

  @autobind
  onPanEnd() {
    this.state.panX = 0;
  }

  render() {
    const { value } = this.props;
    return (
      <Hammer options={hammerOptions} onPan={this.onPan} onPanEnd={this.onPanEnd}>
        <div className={styles.grippy} style={{ left: `${value * 100}%` }} />
      </Hammer>
    );
  }
}
