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

export default class Router {
  constructor(routes, initialUrl, onChange = () => null) {
    this.routes = routes;
    this.url = initialUrl;
    this.onChange = onChange;
  }

  getUrl(name, params) {
    const route = this.routes[name];
    if (!route) throw new Error(`could not find route: ${name}`);
    return route.toPath(params);
  }

  runUrl(url, callback) {
    const match = matchRoute(this.routes, url);

    if (match) {
      const handler = match.route.handler;
      const props = { match, url, router: this };
      const done = (err) => {
        if (callback) callback(err);
        if (!err) {
          this.url = url;
          this.onChange(url);
        }
      };
      handler(props, done);
      if (handler.length < 2) done();
    } else {
      callback(new Error('No match'));
    }

    return match;
  }

  setUrl(url, callback) {
    if (url === this.url) return false;
    return this.runUrl(url, callback);
  }
}
