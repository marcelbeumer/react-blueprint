import React from 'react';
import { List } from 'immutable';
import pureRender from 'pure-render-decorator';

const { Component } = React;
const { object, func } = React.PropTypes;

@pureRender
export default class DotPlotter extends Component {

  static propTypes = {
    dots: object,
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
