import React from 'react';
import ServicesProvider from './ServicesProvider';
import App from './composed/App';
import {Provider} from 'react-redux';
import {ThemeProvider} from 'styled-components';
import theme from './theme';

type RootComponentPropTypes = {
  store: Object,
  services: Object,
};

export default ({store, services}: RootComponentPropTypes) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ServicesProvider services={services}>
        <App />
      </ServicesProvider>
    </ThemeProvider>
  </Provider>
);
