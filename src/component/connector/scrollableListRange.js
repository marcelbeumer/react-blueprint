// @flow
import { connect } from 'react-redux';
import * as actions from '../../store/action';

export default ({ unitSize }: { unitSize: number }) => {

  const onScroll = (scrollTop) => scrollTop / unitSize;

  const mapStateToProps = ({ list }) => ({
    scrollTop: list.start * unitSize,
    onScroll,
  });

  const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    scrollTop: stateProps.scrollTop,
    onScroll: (scrollTop) => dispatchProps.moveListRange(stateProps.onScroll(scrollTop)),
  });

  return connect(mapStateToProps, actions, mergeProps);
};
