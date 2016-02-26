import jss from 'jss';
const sheets = [];

export function styleSheet(styles) {
  const sheet = jss.createStyleSheet(styles);
  sheets.push(sheet);
  return Object.assign({}, sheet.classes, { getStyles: () => styles });
}

export function getCss() {
  return sheets.map(styles => jss.getCss(styles)).join('\n');
}

export default class StyleSheet {
  static create(styles) {
    return styleSheet(styles);
  }
}
