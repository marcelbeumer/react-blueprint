// @flow
import DataTree from '../data/tree';
import render from '../renderer/server';
import createStore from '../store';
// import createRouter from '../router';

export default function bootstrap(): Object {
  // const actionServices = {};
  // const renderServices = {};
  // const routeServices = {};
  const initialState = new DataTree();

  const store = createStore(initialState);
  // const actions = store.actions;
  // const router = createRouter(routeServices, location);
  // routeServices.setScreen = actions.setScreen;
  // renderServices.setUrl = router.setUrl.bind(router);
  // renderServices.getUrl = router.getUrl.bind(router);

  return {
    render: render.bind(null, store),
    // router,
    store,
  };
}
