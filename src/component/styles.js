import jss from 'jss';
const sheets = [];

const camelCaseRegex = /([a-z]|^)([A-Z])/g;

export function translatePropertyCasing(props = {}) {
  const processed = {};
  Object.keys(props).forEach(key => {
    const dashedKey = key.replace(camelCaseRegex, '$1-$2').toLowerCase();
    processed[dashedKey] = props[key];
  });
  return processed;
}

export function styleSheet(styles = {}) {
  const translated = Object.assign({}, styles);
  Object.keys(translated).forEach(selector =>
    translated[selector] = translatePropertyCasing(translated[selector]));

  const sheet = jss.createStyleSheet(translated);
  sheets.push(sheet);
  return Object.assign({}, sheet.classes, { getStyles: () => styles });
}

export function getCss() {
  return sheets.map(styles => styles.toString()).join('\n');
}

export default class StyleSheet {
  static create(styles) {
    return styleSheet(styles);
  }
}
