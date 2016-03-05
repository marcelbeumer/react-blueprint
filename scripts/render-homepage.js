#!/usr/bin/env node
require('babel-register');

const fs = require('fs');
const argv = require('yargs').argv;
const renderHomepage = require('../src/server').renderHomepage;

const html = renderHomepage();

if (argv.f) {
  fs.writeFileSync(argv.f, html);
} else {
  process.stdout.write(html);
}
