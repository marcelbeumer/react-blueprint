# react-starter-kit

A batteries included starter kit and demonstration of particular architectural choices and approaches to common react patterns.

## Getting started

```bash
$ npm install
$ npm start
$ open http://localhost:8080
```

## Setup

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
- Immutable proptypes

## Architecture and patterns

- Single store redux setup based on immutable data (code, article)
- Compose redux reducers using middleware/plain-js-passthrough (code, article)
- Immutable data structures adding import/export functions for server rendering and API data (code, article)
- Complete decoupling for redux, routing and rendering (code, article)
- Clean isomorphism by target specific bootstrap (code, article)
- Routing using plain JS functions
- All redux actions bound to top level data property (article)
- Get root component using plain function passing single data tree as props (code, article)
- Explicit prop passing from component to component (code, article)
- Pure function, explicit react component event handler binding (code, article)
- TODO: Dependency injected, testable modules and react component
- Prefer pure rendering components
- Use pure (post)CSS stylesheets for the web
- Prefer to animate elements using CSS
- Picking between setting top/left and transform CSS properties
- TODO: Animate elements using RAF when CSS is not possible
- Prefer to use CSS to do layout and positioning
- TODO: Have the component figure out layout and positioning when CSS can't do it
- TODO: Update component layout and positioning on resize
- TODO: Deciding when to use component state (app state versus ui state)
- TODO: Trigger run-once UI operations from redux (data properties with UUID)
- TODO: Implement dragging (DONE), resizing and gestures
- TODO: Implement scroll to

Consiously choosing:

- Not to use mutable js objects in redux and/or component props
- Not to have components have any access to redux stores or actions
- Not to rely on component context unless it really makes sense
- Not to create smart components unless it really makes sense
- Not to use JSX for routing
- Not to use JSX based Redux containers
- Not to use JS based CSS (yet)

## Browser debugging

Enable [debug](https://www.npmjs.com/package/debug) output by executing `localStorage.debug = '*'` and reloading the page. See the [debug documentation](https://www.npmjs.com/package/debug#browser-support) for more information.

Expose useful debugging objects by setting a global variable name: `localStarage.expose = '__'`. This will expose to `window.__`.
