// @flow
import DataTree from '../data/tree';
import createRenderer from '../renderer/server';
import createStore from '../store';
import createRoutes from '../route';
import Router from '../router';

const renderer = createRenderer();

export default function bootstrap(location: string): Object {
  const actionServices = {};
  const renderServices = {};
  const routeServices = {};
  const initialState = new DataTree();

  const store = createStore(initialState, actionServices);
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
