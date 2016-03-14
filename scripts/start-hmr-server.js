#!/usr/bin/env node
require('babel-register');

const settings = require('../settings/hmr-server').default;
const hmrServer = require('../src/hmr-server').default;
const port = settings.port;

hmrServer.listen(port, () => {
  console.log(`HMR server started on port ${port}`); // eslint-disable-line no-console
});
