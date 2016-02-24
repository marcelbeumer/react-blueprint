import React from 'react';
import { List } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import pureRender from 'pure-render-decorator';

const { number, func } = React.PropTypes;
const { listOf, recordOf } = ImmutablePropTypes;

@pureRender
export default class DotPlotter extends React.Component {

  static propTypes = {
    dots: listOf(recordOf({
      x: number,
      y: number,
    })),
    onClick: func,
  }

  static defaultProps = {
    dots: new List(),
  }

  renderDots() {
    const { dots } = this.props;
    return dots.map(({ x, y }, i) =>
      <div className="dot-plotter--dot"
        key={`dot-${i}`}
        style={{
          top: `${y * 100}%`,
          left: `${x * 100}%`,
        }}/>);
  }

  render() {
    const { props } = this;
    return (
      <div className="dot-plotter" onClick={props.onClick}>
        <div className="dot-plotter--line"/>
        {this.renderDots()}
      </div>
    );
  }
}
