#!/usr/bin/env node
/* eslint no-console:0 */
require('babel-register');

const argv = require('yargs')
  .usage('Usage: $0 -o [dir]')
  .demand(['o'])
  .argv;

const path = require('path');
const fs = require('fs');
const renderApp = require('../src/server').renderApp;

['/', '/2.html', '/3.html'].forEach(url => {
  renderApp(url).then(html => {
    const filename = url.slice(1) || 'index.html';
    const target = path.join(argv.o, filename);
    fs.writeFileSync(target, html);
  }).catch(e => console.error(e.stack || e));
});
