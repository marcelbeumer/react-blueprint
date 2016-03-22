/* global __resourceQuery */
const client = require('webpack-hot-middleware/client' + __resourceQuery); // eslint-disable-line max-len, prefer-template

const styles = [];
function updateStilr(css) {
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
  styles.unshift(style);
}

function cleanStilr() {
  styles.splice(1).forEach(style => document.head.removeChild(style));
}

client.subscribe(obj => {
  const { action, payload } = obj;
  if (action === 'reload-stilr') {
    console.log('[HMR] updating stilr');
    updateStilr(payload);
  }
});

client.onUpToDate(() => {
  console.log('[HMR] cleaning up stilr');
  cleanStilr();
});

global.foo = module.hot;
