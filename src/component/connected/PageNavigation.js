// @flow
import DotNavigation from '../base/DotNavigation';
import { connect } from 'react-redux';
import * as actions from '../../store/action';

const screens = ['home', 'second', 'third'];

const mapStateToProps = ({ screen }) => ({
  value: screen,
  values: screens,
});

const mapDispatchToProps = (dispatch) => ({
  onChange: (screen) => dispatch(actions.setNamedUrl(screen)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DotNavigation);
