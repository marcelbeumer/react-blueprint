import { createRoute } from './router';

export default function createRoutes(store, actions) {
  const setScreen = ({ match, url }, done) => {
    store.dispatch([
      actions.setRenderedUrl(url),
      actions.setScreen(match.name),
    ]);
    done();
  };

  return {
    third: createRoute('/3.html', setScreen),
    second: createRoute('/2.html', setScreen),
    home: createRoute('/', setScreen),
  };
}
