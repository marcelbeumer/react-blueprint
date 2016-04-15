#!/usr/bin/env node
require('babel-register');

const settings = require('../settings/server').default;
const devServer = require('../src/dev-server').default;
const port = settings.port;

devServer.listen(port, () => {
  console.log(`Dev server started on port ${port}`); // eslint-disable-line no-console
});
