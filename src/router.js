// @flow
import pathToRegexp from 'path-to-regexp';
import createPathMatch from 'path-match';

const createMatcher = createPathMatch();

export function createRoute(path: string, handler: Function = () => null) : Object {
  return {
    path,
    handler,
    match: createMatcher(path),
    toPath: pathToRegexp.compile(path),
  };
}

export function matchRoute(routes: Object, path: string): ?Object {
  let params;
  let name;

  Object.keys(routes).find(key => {
    params = routes[key].match(path);
    if (params) name = key;
    return params;
  });

  return name ? {
    name,
    params,
  } : null;
}

export function InvalidRouteError(message: string) {
  this.message = message;
}

InvalidRouteError.prototype = Object.assign(new Error(), {
  name: 'InvalidRouteError',
});

export default class Router {
  routes: Object;
  url: string;
  onChange: Function;

  constructor(routes: Object, initialUrl: string, onChange: Function = () => null) {
    this.routes = routes;
    this.url = initialUrl;
    this.onChange = onChange;
  }

  getUrl(name: string, params: Object): string {
    const route = this.routes[name];
    if (!route) throw new Error(`could not find route: ${name}`);
    return route.toPath(params);
  }

  _setCurrentUrl(url: string) {
    if (url !== this.url) {
      this.url = url;
      this.onChange(url);
    }
  }

  runUrl(url: string): Promise<string> {
    const match = matchRoute(this.routes, url);

    return new Promise((resolve, reject) => {
      if (match) {
        const route = this.routes[match.name];
        const handler = route.handler;

        const props = {
          url,
          router: this,
          name: match.name,
          params: match.params,
        };

        const done = err => {
          if (err) {
            reject(err);
          } else {
            this._setCurrentUrl(url);
            resolve(url);
          }
        };

        if (handler.length >= 2) {
          handler(props, done);
        } else {
          handler(props);
          done();
        }
      } else {
        reject(new InvalidRouteError(`Url '${url}' did not match any route`));
      }
    });
  }

  setUrl(url: string): Promise<string> {
    if (url === this.url) return Promise.resolve(url);
    return this.runUrl(url);
  }
}
