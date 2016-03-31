// @flow
import { createRoute } from './router';
type Store = {dispatch: Function};

export default function createRoutes(store: Store, actions: Object): Object {
  const setScreen = ({ name }) => {
    store.dispatch(actions.setScreen(name));
  };

  return {
    third: createRoute('/3.html', setScreen),
    second: createRoute('/2.html', setScreen),
    home: createRoute('/', setScreen),
  };
}
