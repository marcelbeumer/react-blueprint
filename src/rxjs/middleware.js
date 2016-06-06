// @flow
export default function createMiddleware(getState: Function, actions: Object): Function {
  return (value) => {
    if (value === '__MIDDLEWARE_DEMO__') {
      actions.setListEnd(0);
      return null;
    }
    return value;
  };
}
