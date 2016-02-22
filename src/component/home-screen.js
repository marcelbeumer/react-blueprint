import React from 'react';
import autobind from 'autobind-decorator';
import pureRender from 'pure-render-decorator';

const { Component } = React;

@autobind
@pureRender
export default class HomeScreen extends Component {

  render() {
    return (
      <div className="home-screen">
        <div className="home-screen--thin-header-bar">.</div>

        <div className="home-screen--hero">
          <div className="home-screen--primary-controls">
            ...
          </div>

          <div className="home-screen--title">
            This is a React starter kit
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
