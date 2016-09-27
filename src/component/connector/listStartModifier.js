// @flow
import { connect } from 'react-redux';
import memoize from 'lodash/memoize';
import * as actions from '../../store/action';

const getOnChange = memoize((length) => (value) => value * length);

const mapStateToProps = ({ list }) => ({
  value: list.start / list.length,
  onChange: getOnChange(list.length),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  value: stateProps.value,
  onChange: (value) => dispatchProps.setListStart(stateProps.onChange(value)),
});

export default () => connect(mapStateToProps, actions, mergeProps);
