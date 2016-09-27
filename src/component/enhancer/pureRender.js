// @flow
import React from 'react';

const pureRender = (): Function => (Component) => {
  return class PureRender extends React.PureComponent {
    render() {
      return <Component {...this.props} />;
    }
  };
};

export default pureRender;
