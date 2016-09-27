// @flow
import React from 'react';

const withClassName = (className: string): Function =>
  (Component) => (props) => <Component className={className} {...props} />;

export default withClassName;
