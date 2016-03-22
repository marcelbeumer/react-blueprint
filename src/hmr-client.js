/* global __resourceQuery */

let style;
function reloadStilr(css) {
  if (!style) {
    style = document.createElement('style');
    document.head.appendChild(style);
  }
  style.textContent = css;
}

global.reloadStilr = reloadStilr;

const client = require('webpack-hot-middleware/client' + __resourceQuery); // eslint-disable-line max-len, prefer-template
client.subscribe(obj => {
  const { action, payload } = obj;
  if (action === 'reload-stilr') {
    console.log('[HMR] reloading stilr');
    reloadStilr(payload);
  }
});
