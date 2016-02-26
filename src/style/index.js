require('../component');
const components = require('../component/styles').getCss();

module.exports = `
@import 'theme.css';
@import 'html-body.css';
@import 'component/home-screen.css';
${components}
`;
