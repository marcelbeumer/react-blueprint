// @flow
import { connect } from 'react-redux';
import * as actions from '../../store/action';

export default ({ unitSize }: { unitSize: number }) => {
  const mapStateToProps = ({ list }) => ({
    scrollTop: list.start * unitSize,
    onScroll: (scrollTop) => scrollTop / unitSize,
  });

  const mapDispatchToProps = (dispatch) => ({
    onScroll: (start) => dispatch(actions.moveListRange(start)),
  });

  const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    scrollTop: stateProps.scrollTop,
    onScroll: (scrollTop) => dispatchProps.onScroll(stateProps.onScroll(scrollTop)),
  });

  return connect(mapStateToProps, mapDispatchToProps, mergeProps);
};
