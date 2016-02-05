import React from 'react';
const { Component } = React;

export default class Screen extends Component {
  render() {
    const { props } = this;
    return <div>hello {props.name}</div>;
  }
}
