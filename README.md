# react-blueprint

> Ready for takeoff React setup. Demonstrates frontend architecture and approaches to common React patterns.

[![Build Status](https://travis-ci.org/marcelbeumer/react-blueprint.svg?branch=master)](https://travis-ci.org/marcelbeumer/react-blueprint)
[![Dependency Status](https://david-dm.org/marcelbeumer/react-blueprint.svg)](https://david-dm.org/marcelbeumer/react-blueprint)
[![devDependency Status](https://david-dm.org/marcelbeumer/react-blueprint/dev-status.svg)](https://david-dm.org/marcelbeumer/react-blueprint#info=devDependencies)

## Getting started

```bash
$ npm install
$ npm start
$ open http://localhost:8080
```

## Features and patterns

- ES6+ with Babel, Flow and Airbnb-style ESLint
- Clean Redux setup running on Immutable.js data (no React or routing bindings)
- Uses Electron for building desktop apps
- Server pre-rendering React elements and component stylesheets
- Browser/electron/server rendering divided by target specific bootstrap
- Decoupled rendering: Redux state changes triggers plain JS function that does React.render
- Decoupled routing based on path-to-regexp
- Pure rendering (Redux-agnostic) React components: top-down prop passing, action functions
- Component CSS stylesheet generation (`StyleSheet.create({..})`)
- Draggable widgets demonstrating letting Redux control rules and constraints
- Scrollable widget demonstrating a two-way binding case for React in the browser
- Widgets use relative (em/vw/vh) units while rendering to maintain full server pre-render capabilities
- Animated page to page navigation using app/Redux state and react-motion
- Fast dev-server that hot reloads browser and server code on webpack changes

## Server rendering

Server rendering is enabled by default. To disable use `SSR=0 npm start` or reload the page using `?ssr=0`.

When disabled the server will only return the base template and not do any router, Redux or React work.
However, the server will still load and parse the entire application in order to generate the component CSS.

## Browser debugging

Enable [debug](https://www.npmjs.com/package/debug) output by executing `localStorage.debug = '*'` and reloading the page. See the [debug documentation](https://www.npmjs.com/package/debug#browser-support) for more information.

Expose useful debugging objects by setting a global variable name: `localStarage.expose = '__'`. This will expose to `window.__`.

## Electron

Development:
```bash
$ npm run electron-dev-server
$ npm run electron-dev
```

Production:
```bash
$ npm run electron-build
$ npm run electron
```

Build OSX app:
```bash
$ npm run electron-package-darwin-x64
$ open build
```
