# react-blueprint [![Build Status](https://travis-ci.org/marcelbeumer/react-blueprint.svg?branch=master)](https://travis-ci.org/marcelbeumer/react-blueprint) [![devDependency Status](https://david-dm.org/marcelbeumer/react-blueprint/dev-status.svg)](https://david-dm.org/marcelbeumer/react-blueprint#info=devDependencies)

> Showcase React architecture

## Getting started

```bash
$ npm install
$ npm start
$ open http://localhost:8080
```

## Features

- Babel, Webpack, Flow
- Immutable.js data
- Flat functional-style component structure
- Redux store
- Decoupled (mini)router
- CSS in JS using Stilr
- Animation with react-motion
- Devserver that reloads browser and server code

## Server rendering

Server rendering is enabled by default. To disable use `SSR=0 npm start` or reload the page using `?ssr=0`.

## Browser debugging

Enable [debug](https://www.npmjs.com/package/debug) output by executing `localStorage.debug = '*'` and reloading the page. See the [debug documentation](https://www.npmjs.com/package/debug#browser-support).

Expose useful debugging objects by setting a global variable name: `localStarage.expose = '__'`. This will expose to `window.__`.
