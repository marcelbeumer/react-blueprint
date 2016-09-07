#!/usr/bin/env node
require('babel-register');
const devServer = require('../src/dev-server').default;

const port = parseInt(process.env.PORT, 10) || 8080;

devServer.listen(port, () => {
  const message = `Dev server started on port ${port} \
with pid ${process.pid}`;
  console.log(message); // eslint-disable-line no-console
});
