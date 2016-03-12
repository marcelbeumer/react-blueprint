import pathToRegexp from 'path-to-regexp';
import { join } from 'path';

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

  setUrl(url, title, callback) {
    const match = matchRoute(this.routes, url);

    if (match) {
      const handler = match.route.handler;
      const props = { match, url, router: this };
      handler(props, callback);
      if (callback && handler.length < 2) callback();
    } else {
      callback(new Error('No match'));
    }

    return match;
  }
}

export class StatefulRouter extends StatelessRouter {
  constructor(routes, initialUrl, onChange) {
    super(routes);
    this.url = initialUrl;
    this.onChange = onChange;
  }

  setUrl(url, title, callback) {
    if (url === this.url) return false;
    return super.setUrl(url, title, err => {
      if (!err) {
        this.url = url;
        this.onChange(url, title);
      }
      if (callback) callback(err);
    });
  }
}
