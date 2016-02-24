import React from 'react';
import { List } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import pureRender from 'pure-render-decorator';

const { number, func } = React.PropTypes;
const { listOf, recordOf } = ImmutablePropTypes;

@pureRender
export default class BarMeter extends React.Component {

  static propTypes = {
    bars: listOf(recordOf({
      value: number,
    })),
    onClick: func,
  }

  static defaultProps = {
    bars: new List(),
  }

  renderBars() {
    const { bars } = this.props;
    return bars.map(({ value }, i) => {
      const perc = value * 100;
      const label = `${Math.round(perc)}%`;
      return (
        <div className="bar-meter--item" key={`bar-${i}`}>
          <div className="bar-meter--bar" style={{
            transform: `translateX(-50%) scaleX(${value}) translateX(50%)`,
          }}>
          </div>
          <div className="bar-meter--label">{label}</div>
        </div>
      );
    });
  }

  render() {
    const { props } = this;
    return (
      <div className="bar-meter" onClick={props.onClick}>
        {this.renderBars()}
      </div>
    );
  }
}
