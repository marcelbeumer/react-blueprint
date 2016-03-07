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
        <div className={styles.grippy} style={{ left: `${value * 100}%` }} />
      </Hammer>
    );
  }
}
