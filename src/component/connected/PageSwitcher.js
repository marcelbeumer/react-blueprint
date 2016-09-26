// @flow
import PageSwitcher from '../composed/PageSwitcher';
import { connect } from 'react-redux';

const mapStateToProps = ({ screen }) => ({
  name: screen,
});

export default connect(mapStateToProps)(PageSwitcher);
