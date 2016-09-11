// @flow
import React from 'react'; // eslint-disable-line no-unused-vars
import { Provider } from 'react-redux';
import App from '../component';

export default function render(store: Object): React.Element<*> {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
