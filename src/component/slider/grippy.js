import React from 'react';
import { DraggableCore } from 'react-draggable';
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
    onChange: func,
  }

  static defaultProps = {
    value: 0,
    onDrag: () => null,
    onChange: () => null,
  }

  @autobind
  onDrag(e, ui) {
    this.props.onDrag(e, ui, this);
  }

  render() {
    const { value } = this.props;
    return (
      <DraggableCore onDrag={this.onDrag}>
        <div className={styles.grippy} style={{ left: `${value * 100}%` }} />
      </DraggableCore>
    );
  }
}
