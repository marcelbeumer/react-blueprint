import React from 'react';
const { Component } = React;

export default class FlatButton extends Component {
  render() {
    const { props } = this;
    return (
      <button {...props} className="flat-button">
        {props.children}
      </button>
    );
  }
}
