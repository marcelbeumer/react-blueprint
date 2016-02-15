import React from 'react';
import FlatButton from './flat-button';
import autobind from 'autobind-decorator';
import pureRender from 'pure-render-decorator';

const { Component } = React;
const { object, string } = React.PropTypes;

@pureRender
export default class Screen extends Component {

  @autobind
  onButtonClick() {
    const { actions } = this.props;
    actions.setName('react...');
  }

  render() {
    const { props } = this;
    const { name } = props;
    return (
      <div>
        <p>hello {name}</p>
        <p>
          <FlatButton onClick={this.onButtonClick}>
            Click this
          </FlatButton>
        </p>
      </div>
    );
  }
}

Screen.propTypes = {
  actions: object,
  name: string,
};
