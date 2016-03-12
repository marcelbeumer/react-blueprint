#!/usr/bin/env node
require('babel-register');

const argv = require('yargs')
  .usage('Usage: $0 -o [dir]')
  .demand(['o'])
  .argv;

const path = require('path');
const fs = require('fs');
const renderApp = require('../src/server').renderApp;
const basePath = require('../settings/route').basePath;
const join = path.join;

['/', '/2.html', '/3.html'].forEach(url => {
  renderApp(join(basePath, url), (err, html) => {
    const filename = url.slice(1) || 'index.html';
    const target = path.join(argv.o, filename);
    fs.writeFileSync(target, html);
  });
});
