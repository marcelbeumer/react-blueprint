import pathToRegexp from 'path-to-regexp';

export function createRoute(path, handler) {
  const keys = [];
  const re = pathToRegexp(path, keys);
  const toPath = pathToRegexp.compile(path);
  return {
    handler,
    path,
    keys,
    re,
    toPath,
  };
}

export function matchRoute(routes, path) {
  let result;

  const name = Object.keys(routes).find(key => {
    result = routes[key].re.exec(path);
    return !!result;
  });

  if (!name) return false;

  return {
    name,
    result,
    route: routes[name],
  };
}

export default function createRouter(routes) {
  return {
    routes,
    match(path) {
      return matchRoute(routes, path);
    },
    getUrl(name, params) {
      const route = routes[name];
      if (!route) throw new Error(`could not find router: ${name}`);
      return route.toPath(params);
    },
    route(path) {
      const match = matchRoute(routes, path);
      if (match) {
        const handler = match.route.handler;
        if (handler) handler(match);
      }
      return match;
    },
  };
}
