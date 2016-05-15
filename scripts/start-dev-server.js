#!/usr/bin/env node
require('babel-register');

const settings = require('../settings/server');
const devServer = require('../src/dev-server').default;
const port = settings.port;

devServer.listen(port, () => {
  const message = `Dev server started on port ${port} \
with pid ${process.pid}`;
  console.log(message); // eslint-disable-line no-console
});
