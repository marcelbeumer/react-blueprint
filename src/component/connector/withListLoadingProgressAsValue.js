// @flow
import {connect} from 'react-redux';

const mapStateToProps = ({listLoadingProgress}) => ({
  value: listLoadingProgress,
});

export default () => connect(mapStateToProps);
