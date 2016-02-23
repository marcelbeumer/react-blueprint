import React from 'react';
import pureRender from 'pure-render-decorator';
import DotPlotter from './dot-plotter';
import BarMeter from './bar-meter';

const { Component } = React;
const { object } = React.PropTypes;

@pureRender
export default class HomeScreen extends Component {
  static propTypes = {
    actions: object,
    dots: object,
  }

  render() {
    const { actions, dots, bars } = this.props;

    return (
      <div className="home-screen">
        <div className="home-screen--thin-header-bar">.</div>

        <div className="home-screen--hero">
          <div className="home-screen--primary-controls">
            <DotPlotter dots={dots} onClick={actions.generateDots}/>
          </div>

          <div className="home-screen--title">
            this is a React starter kit
          </div>

          <div className="home-screen--secondary-controls">
            <BarMeter bars={bars} onClick={actions.generateBars}/>
          </div>
        </div>

        <div className="home-screen--profile">...</div>
        <div className="home-screen--details">...</div>
        <div className="home-screen--websites">....</div>
      </div>
    );
  }
}
