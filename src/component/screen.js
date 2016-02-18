import React from 'react';
import FlatButton from './flat-button';
import autobind from 'autobind-decorator';
import pureRender from 'pure-render-decorator';

const { Component } = React;
const { object, string } = React.PropTypes;

@autobind
@pureRender
export default class Screen extends Component {

  static propTypes = {
    actions: object,
    greeting: string,
  };

  onButtonClick() {
    const { actions } = this.props;
    actions.setGreeting('React...');
  }

  render() {
    const { greeting } = this.props;
    return (
      <div>
        <p>{greeting}</p>
        <p>
          <FlatButton onClick={this.onButtonClick}>
            Click this
          </FlatButton>
        </p>
      </div>
    );
  }
}
