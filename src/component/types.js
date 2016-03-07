import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

const { number } = React.PropTypes;
const { recordOf } = ImmutablePropTypes;

export const listType = recordOf({
  length: number,
  start: number,
  end: number,
});
