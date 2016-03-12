import { createRoute } from './router';

export default function createRoutes(store, actions) {
  const setScreen = ({ match }) => {
    store.dispatch(actions.setScreen(match.name));
  };

  return {
    third: createRoute('/3.html', setScreen),
    second: createRoute('/2.html', setScreen),
    home: createRoute('/', setScreen),
  };
}
