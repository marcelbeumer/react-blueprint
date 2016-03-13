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

  _setCurrentUrl(url) {
    if (url !== this.url) {
      this.url = url;
      this.onChange(url);
    }
  }

  runUrl(url) {
    const match = matchRoute(this.routes, url);

    return new Promise((resolve, reject) => {
      if (match) {
        const handler = match.route.handler;
        const props = { match, url, router: this };
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
          handler(global.document ? null : props);
          done();
        }
      } else {
        reject(new Error(`Url '${url}' did not match any route`));
      }
    });
  }

  setUrl(url) {
    if (url === this.url) return Promise.resolve(url);
    return this.runUrl(url);
  }
}
