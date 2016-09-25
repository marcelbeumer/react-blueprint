// @flow
import { connect } from 'react-redux';
import * as actions from '../../store/action';

const mapStateToProps = ({ list }) => ({
  value: list.start / list.length,
  onChange: (value) => value * list.length,
});

const mapDispatchToProps = (dispatch) => ({
  onChange: (value) => dispatch(actions.setListStart(value)),
});

const mergeProps = (stateProps, dispatchProps) => ({
  value: stateProps.value,
  onChange: (value) => dispatchProps.onChange(stateProps.onChange(value)),
});

export default () => connect(mapStateToProps, mapDispatchToProps, mergeProps);
