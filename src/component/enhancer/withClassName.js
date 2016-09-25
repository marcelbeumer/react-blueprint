// @flow
import React from 'react';

export default function withClassName(className: string): Function {
  return (Component) => (props) => <Component className={className} {...props} />;
}
