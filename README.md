# react-starter-kit

A batteries included starter kit, demonstration of particular architectural choices and approaches to common react patterns.

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
- Server: express, react component rendering

Planned:

- Complex react components
- Complex redux with thunks, promises, etc.
- Hot module reloading
- Dependency injection
- Immutable proptypes

## Architecture and patterns

- Single store redux setup based on immutable data
- TODO Compose redux reducers using middleware/plain-js-passthrough
- TODO Immutable data structures adding import/export functions for server rendering and API data
- Complete decoupling for redux, routing and rendering
- Clean browser/server rendering by target specific bootstrap
- TODO Routing using plain JS functions
- All redux actions bound to top level data property
- Get root component using plain function passing single data tree as props
- Explicit prop passing from component to component
- Pure function, explicit react component event handler binding
- TODO: Dependency injected, testable modules and react component
- Prefer pure rendering components
- Use Stilr for component CSS (`StyleSheet.create`)
- Use (post)CSS stylesheets for non component CSS
- Prefer to animate elements using CSS
- Picking between setting top/left and transform CSS properties
- TODO: Animate elements using RAF when CSS is not possible
- Prefer to use CSS to do layout and positioning
- TODO: Have the component figure out layout and positioning when CSS can't do it
- TODO: Update component layout and positioning on resize
- TODO: Deciding when to use component state (app state versus ui state)
- TODO: Trigger run-once UI operations from redux (data properties with UUID)
- TODO: Implement dragging (DONE), resizing (DONE) and gestures
- TODO: Implement scroll to
- Rendering long lists

Consiously choosing:

- Not to use mutable js objects in redux and/or component props
- Not to have components have any access to redux stores or actions
- Not to rely on component context unless it really makes sense
- Not to create smart components unless it really makes sense
- Not to use JSX for routing
- Not to use JSX based Redux containers

## Concerns with current setup

- Redux async actions need to manage their own asynchronicity and that's hard. When an async action calls `dispatch(otherAction())` internally it has to know if the other action is async or not to garantuee being able to return a single promise when doing server rendering. Better would be if redux would manage resolving all dispatched actions and provide a single callback like [fluxebu](https://github.com/uxebu/fluxebu) does.

## Browser debugging

Enable [debug](https://www.npmjs.com/package/debug) output by executing `localStorage.debug = '*'` and reloading the page. See the [debug documentation](https://www.npmjs.com/package/debug#browser-support) for more information.

Expose useful debugging objects by setting a global variable name: `localStarage.expose = '__'`. This will expose to `window.__`.
