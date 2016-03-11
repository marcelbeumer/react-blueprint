import pathToRegexp from 'path-to-regexp';

export function createRoute(path, handler = () => null) {
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

export class StatelessRouter {
  constructor(routes) {
    this.routes = routes;
  }

  getUrl(name, params) {
    const route = this.routes[name];
    if (!route) throw new Error(`could not find route: ${name}`);
    return route.toPath(params);
  }

  setUrl(url) {
    const match = matchRoute(this.routes, url);
    if (match) match.route.handler(match);
    return match;
  }
}

export class StatefulRouter extends StatelessRouter {
  constructor(routes, initialUrl, onChange) {
    super(routes);
    this.url = initialUrl;
    this.onChange = onChange;
  }

  setUrl(url, title) {
    if (url === this.url) return false;
    const match = super.setUrl(url);
    if (match) {
      this.url = url;
      this.onChange(url, title);
    }
    return match;
  }
}
