import { createRoute } from './router';
import settings from '../settings/route';

export const { basePath } = settings;

export default function createRoutes(store, actions) {
  const route = createRoute.base(basePath);

  const setScreen = ({ match, url }) => {
    store.dispatch([
      actions.setRenderedUrl(url),
      actions.setScreen(match.name),
    ]);
  };

  return {
    third: route('/3.html', setScreen),
    second: route('2.html', setScreen),
    home: route('/', setScreen),
  };
}
