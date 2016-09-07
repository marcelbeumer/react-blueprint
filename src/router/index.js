// @flow
import createRoutes from './route';
import Router from './router';

export { InvalidRouteError } from './router';

export default function createRouter(
  routeServices: Object,
  initialUrl: string,
  onChange?: Function): Router {
  return new Router(createRoutes(routeServices), initialUrl, onChange);
}
