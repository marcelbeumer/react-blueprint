import React from 'react';
import ServicesProvider from './ServicesProvider';
import App from './composed/App';
import { Provider } from 'react-redux';

type RootComponentPropTypes = {
  store: Object,
  services?: Object,
};

export default ({ store, services }: RootComponentPropTypes) => (
  <Provider store={store}>
    <ServicesProvider services={services}>
      <App />
    </ServicesProvider>
  </Provider>
);
