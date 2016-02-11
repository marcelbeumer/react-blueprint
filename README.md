# react-starter-kit

## Getting started

```bash
$ npm install
$ npm start
$ open http://localhost:8080
```

## Features

- Babel: es2015, stage-0, react
- Eslint: airbnb style, babel parser
- Immutable.js
- React: standalone (redux-agnostic) rendering
- Redux
- Webpack
- Server: express, isomorphic rendering

Planned:

- Complex react components
- Complex redux with thunks, promises, etc.
- Hot module reloading
- Dependency injection

## Browser debugging

Enable [debug](https://www.npmjs.com/package/debug) output by executing `localStorage.debug = '*'` and reloading the page. See the [debug documentation](https://www.npmjs.com/package/debug#browser-support) for more information.

Expose useful debugging objects by setting a global variable name: `localStarage.expose = '__'`. This will expose to `window.__`.
