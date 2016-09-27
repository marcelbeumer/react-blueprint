// @flow
import Button from '../base/Button';
import { connect } from 'react-redux';
import * as actions from '../../store/action';

const mapStateToProps = ({ listLoading }) => ({
  disabled: listLoading,
});

const mapDispatchToProps = (dispatch) => ({
  onClick: () => dispatch(actions.loadMoreListItems()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Button);
