import csjs from 'csjs';
const sheets = [];

export function styleSheet(strings) {
  const sheet = csjs(strings);
  sheets.push(sheet);
  return sheet;
}

export function getCss() {
  return sheets.map(styles => csjs.getCss(styles)).join('\n');
}
