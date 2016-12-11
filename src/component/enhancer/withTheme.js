// @flow
// from https://github.com/styled-components/styled-components/issues/272
import React from 'react';
import {CHANNEL} from 'styled-components/lib/models/ThemeProvider';

export default (Component: any) => class extends React.Component {
  static contextTypes = {
    [CHANNEL]: React.PropTypes.func,
  };

  unsubscribe: ?Function = null;

  state = {
    theme: undefined,
  };

  componentWillMount() {
    const subscribe = this.context[CHANNEL];
    this.unsubscribe = subscribe(theme => {
      this.setState({theme});
    });
  }

  componentWillUnmount() {
    if (typeof this.unsubscribe === 'function') this.unsubscribe();
  }

  render() {
    const {theme} = this.state;
    return <Component theme={theme} {...this.props} />;
  }
};
