// @flow
import {connect} from 'react-redux';
import * as actions from '../../store/action';

export default ({unitSize}: { unitSize: number }) => {

  const onResize = (height) => (height / unitSize);

  const mapStateToProps = ({list}) => ({
    height: (list.end - list.start) * unitSize,
    onResize,
  });

  const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    height: stateProps.height,
    onResize: (height) => {
      dispatchProps.setListRangeSize(stateProps.onResize(height));
    },
  });

  return connect(mapStateToProps, actions, mergeProps);
};
