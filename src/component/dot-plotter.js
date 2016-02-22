import React from 'react';
import { List } from 'immutable';
import autobind from 'autobind-decorator';
import pureRender from 'pure-render-decorator';

const { Component } = React;
const { object } = React.PropTypes;

@autobind
@pureRender
export default class DotPlotter extends Component {

  static propTypes = {
    dots: object,
  }

  static defaultProps = {
    dots: new List(),
  }

  renderDots() {
    const { dots } = this.props;
    const getStyle = ({ x, y }) => ({
      top: `${y * 100}%`,
      left: `${x * 100}%`,
    });
    return dots.map((dot, x) =>
      <div className="dot-plotter--dot" key={`dot-${x}`} style={getStyle(dot)}/>);
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
