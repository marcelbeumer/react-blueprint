import React from 'react';
import Gestures from '../gestures';
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

@pureRender
export default class SliderGrippy extends React.Component {
  static propTypes = {
    value: number,
    onDrag: func,
  }

  static defaultProps = {
    value: 0,
    onDrag: () => null,
  }

  @autobind
  onPan(e) {
    this.props.onDrag(e, this);
  }

  render() {
    const { value } = this.props;
    return (
      <Gestures onPan={this.onPan}>
        <div className={styles.grippy} style={{ left: `${value * 100}%` }} />
      </Gestures>
    );
  }
}
