import React from 'react';
import FlatButton from './flat-button';
const { Component } = React;
const { object, string } = React.PropTypes;

export default class Screen extends Component {
  constructor(props) {
    super(props);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

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
