// @flow
import React from 'react';

const Div = (props) => <div {...props} />;

export default function withClassName(className: string): Function {
  return (Component = Div) => (props) => <Component className={className} {...props} />;
}
