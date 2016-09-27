// @flow
import DotNavigation from '../base/DotNavigation';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { connectServices } from '../ServicesProvider';

const screens = ['home', 'second', 'third'];

const mapStateToProps = ({ screen }) => ({
  value: screen,
  values: screens,
});

const servicesToProps = ({ getUrl, setUrl }) => ({
  onChange: (screen) => setUrl(getUrl(screen)),
});

export default compose(
  connect(mapStateToProps),
  connectServices(servicesToProps),
)(DotNavigation);
