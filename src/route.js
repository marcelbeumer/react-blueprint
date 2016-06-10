// @flow
import { createRoute } from './router';

export default function createRoutes(routeServices: Object): Object {
  const setScreen = ({ name }) => {
    routeServices.setScreen(name);
  };

  return {
    third: createRoute('/3.html', setScreen),
    second: createRoute('/2.html', setScreen),
    home: createRoute('/', setScreen),
  };
}
