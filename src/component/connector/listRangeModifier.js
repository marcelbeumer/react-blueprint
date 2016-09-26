// @flow
import { connect } from 'react-redux';
import * as actions from '../../store/action';

const mapStateToProps = ({ list: { start, end, length } }) => ({
  values: [start / length, end / length],
  onChange: (values) => values.map((value) => value * length),
});

const mapDispatchToProps = (dispatch) => ({
  onChange: (values) => dispatch(actions.setListRange(values[0], values[1])),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  values: stateProps.values,
  onChange: (values) => dispatchProps.onChange(stateProps.onChange(values)),
});

export default () => connect(mapStateToProps, mapDispatchToProps, mergeProps);
