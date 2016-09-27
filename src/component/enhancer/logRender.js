// @flow
import React from 'react';

const logRender = (message: string): Function =>
  (Component) => (props) => {
    console.log(message);
    return <Component {...props} />;
  };

export default logRender;
