import React from 'react';

export default class FlatButton extends React.Component {
  render() {
    const { props } = this;
    return (
      <button {...props} className="flat-button">
        {props.children}
      </button>
    );
  }
}
