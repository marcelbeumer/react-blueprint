import React from 'react';
import autobind from 'autobind-decorator';
import pureRender from 'pure-render-decorator';
import DotPlotter from './dot-plotter';

const { Component } = React;
const { object } = React.PropTypes;

@pureRender
export default class HomeScreen extends Component {
  static propTypes = {
    actions: object,
    dots: object,
  }

  @autobind
  onDotPlotterClick() {
    const { actions } = this.props;
    actions.generateDots();
  }

  render() {
    const { dots } = this.props;

    return (
      <div className="home-screen">
        <div className="home-screen--thin-header-bar">.</div>

        <div className="home-screen--hero">
          <div className="home-screen--primary-controls">
            <DotPlotter dots={dots} onClick={this.onDotPlotterClick}/>
          </div>

          <div className="home-screen--title">
            this is a React starter kit
          </div>

          <div className="home-screen--secondary-controls">
            ...
          </div>
        </div>

        <div className="home-screen--profile">...</div>
        <div className="home-screen--details">...</div>
        <div className="home-screen--websites">....</div>
      </div>
    );
  }
}
