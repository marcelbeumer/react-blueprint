require('babel-register');

const settings = require('../settings/server').default;
const server = require('../server').default;
const port = settings.port;

server.listen(port, () => {
  console.log(`Server started on port ${port}`); // eslint-disable-line no-console
});
