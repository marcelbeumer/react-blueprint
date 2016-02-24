import React from 'react';
import { DraggableCore } from 'react-draggable';
import pureRender from 'pure-render-decorator';
import autobind from 'autobind-decorator';

const { number, func } = React.PropTypes;

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
        <div className="slider--grippy" style={{ left: `${value * 100}%` }}/>
      </DraggableCore>
    );
  }
}
