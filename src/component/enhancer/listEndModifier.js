// @flow
import { connect } from 'react-redux';
import * as actions from '../../store/action';

const mapStateToProps = ({ list }) => ({
  value: list.end / list.length,
  onChange: (value) => value * list.length,
});

const mapDispatchToProps = (dispatch) => ({
  onChange: (value) => dispatch(actions.setListEnd(value)),
});

const mergeProps = (stateProps, dispatchProps) => ({
  value: stateProps.value,
  onChange: (value) => dispatchProps.onChange(stateProps.onChange(value)),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps);
