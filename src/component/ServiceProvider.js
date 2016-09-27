import React from 'react';
import { connectToContext } from 'connect-to-context';

export const connectToService = (servicesToProps: Function) =>
  connectToContext('services', (context) => servicesToProps(context.services));

export default class ServiceProvider extends React.Component {
  props: {
    children?: any,
    services?: Object,
  };

  static childContextTypes = {
    services: React.PropTypes.object,
  };

  getChildContext() {
    return {
      services: this.props.services,
    };
  }

  render() {
    return React.Children.only(this.props.children);
  }
}
