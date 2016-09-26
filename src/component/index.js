import React from 'react';
import App from './composed/App';
import { Provider } from 'react-redux';

export default ({ store }: { store: Object }) => (
  <Provider store={store}>
    <App />
  </Provider>
);
