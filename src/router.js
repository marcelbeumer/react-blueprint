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

  return {
    name,
    result,
    route: routes[name],
  };
}

export default function createRouter(routes) {
  return {
    match(path) {
      const match = matchRoute(routes, path);
      if (match.name) {
        const handler = match.route.handler;
        if (handler) handler(match);
        return true;
      }
      return false;
    },
  };
}
