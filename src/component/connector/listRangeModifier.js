// @flow
import { connect } from 'react-redux';
import memoize from 'lodash/memoize';
import * as actions from '../../store/action';

const mapStateToProps = memoize(({ list: { start, end, length } }) => ({
  values: [start / length, end / length],
  onChange: (values) => values.map((value) => value * length),
}), (state) => state.list);

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  values: stateProps.values,
  onChange: (values) => {
    const [start, end] = stateProps.onChange(values);
    dispatchProps.setListRange(start, end);
  },
});

export default () => connect(mapStateToProps, actions, mergeProps);
