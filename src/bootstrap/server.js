// @flow
import DataTree from '../data/tree';
import createRenderer from '../renderer/server';
import createReduxStore from '../redux';
import createRxJsStore from '../rxjs';
import createRoutes from '../route';
import Router from '../router';

const renderer = createRenderer();

export default function bootstrap(location: string): Object {
  let store;
  const actionServices = {};
  const renderServices = {};
  const routeServices = {};
  const initialState = new DataTree();

  if (initialState.get('store') === 'rxjs') {
    store = createReduxStore(initialState, actionServices);
  } else {
    store = createRxJsStore(initialState, actionServices);
  }

  const actions = store.actions;
  const router = new Router(createRoutes(routeServices), location);
  routeServices.setScreen = actions.setScreen;
  renderServices.setUrl = router.setUrl.bind(router);
  renderServices.getUrl = router.getUrl.bind(router);

  return {
    render: () => renderer(store.getState(), actions, renderServices),
    router,
    store,
  };
}
