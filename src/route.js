// @flow
import { createRoute } from './router';

export default function createRoutes(actions: Object): Object {
  const setScreen = ({ name }) => {
    actions.setScreen(name);
  };

  return {
    third: createRoute('/3.html', setScreen),
    second: createRoute('/2.html', setScreen),
    home: createRoute('/', setScreen),
  };
}
