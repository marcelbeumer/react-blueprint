import React from 'react';
import { List } from 'immutable';
import autobind from 'autobind-decorator';
import pureRender from 'pure-render-decorator';

const { Component } = React;
const { object, func } = React.PropTypes;

@pureRender
export default class BarMeter extends Component {

  static propTypes = {
    bars: object,
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
      return <div className="bar-meter--item" key={`bar-${i}`}>
        <div className="bar-meter--bar" style={{
          transform: `translateX(-50%) scaleX(${value}) translateX(50%)`
        }}>
        </div>
        <div className="bar-meter--label">{label}</div>
      </div>
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
