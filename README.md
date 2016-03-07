# react-blueprint

> Ready for takeoff React setup. Demonstrates frontend architecture and approaches to common React patterns.

## Getting started

```bash
$ npm install
$ npm start
$ open http://localhost:8080
```

## Features and patterns

- ES6+ with Babel (es)linted airbnb style
- Clean Redux setup running on Immutable.js data (no react or routing bindings)
- Server pre-rendering React elements and component stylesheets
- Browser/server rendering divided by target specific bootstrap
- Decoupled rendering: redux state changes triggers plain JS function that does React.render
- Pure rendering (redux-agnostic) React components: top-down prop passing, action functions
- Use Stilr for component CSS (`StyleSheet.create`)
- Draggable widgets demonstrating letting redux control rules and constraints
- Scrollable widget demonstrating a two-way binding case for react in the browser
- Widgets use relative (em/vw/vh) units while rendering to maintain full server pre-render capabilities
- Animated page to page navigation using app/redux state and nothing-fancy react rendering

## Browser debugging

Enable [debug](https://www.npmjs.com/package/debug) output by executing `localStorage.debug = '*'` and reloading the page. See the [debug documentation](https://www.npmjs.com/package/debug#browser-support) for more information.

Expose useful debugging objects by setting a global variable name: `localStarage.expose = '__'`. This will expose to `window.__`.
