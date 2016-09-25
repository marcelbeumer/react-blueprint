// @flow
import DotNavigation from '../base/DotNavigation';
import { connect } from 'react-redux';
import * as actions from '../../store/action';

const screens = ['home', 'third', 'second'];

const mapStateToProps = ({ screen }) => ({
  value: screen,
  values: screens,
});

const mapDispatchToProps = (dispatch) => ({
  onChange: (screen) => dispatch(actions.setScreen(screen)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DotNavigation);
