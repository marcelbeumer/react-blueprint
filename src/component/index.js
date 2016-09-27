import React from 'react';
import ServiceProvider from './ServiceProvider';
import App from './composed/App';
import { Provider } from 'react-redux';

type RootComponentPropTypes = {
  store: Object,
  services?: Object,
};

export default ({ store, services }: RootComponentPropTypes) => (
  <Provider store={store}>
    <ServiceProvider services={services}>
      <App />
    </ServiceProvider>
  </Provider>
);
