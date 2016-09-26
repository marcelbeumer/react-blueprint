// @flow
import { connect } from 'react-redux';
import * as actions from '../../store/action';

export default ({ unitSize }: { unitSize: number }) => {
  const mapStateToProps = ({ list }) => ({
    height: (list.end - list.start) * unitSize,
    onResize: (height) => [list.start, list.start + (height / unitSize)],
  });

  const mapDispatchToProps = (dispatch) => ({
    onResize: (value) => dispatch(actions.setListEnd(value)),
  });

  const mergeProps = (stateProps, dispatchProps) => ({
    height: stateProps.height,
    onResize: (height) => {
      dispatchProps.onResize(stateProps.onResize(height)[1]);
    },
  });

  return connect(mapStateToProps, mapDispatchToProps, mergeProps);
};
