import { createRoute } from './router';
import settings from '../settings/route';

export const { basePath } = settings;

export default function createRoutes(store, actions) {
  const setScreen = ({ match, url }) => {
    store.dispatch([
      actions.setRenderedUrl(url),
      actions.setScreen(match.name),
    ]);
  };

  return {
    third: createRoute('/react-blueprint/3.html', setScreen),
    second: createRoute('/react-blueprint/2.html', setScreen),
    home: createRoute('/react-blueprint/', setScreen),
  };
}
