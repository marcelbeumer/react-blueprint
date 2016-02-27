import { render, create, Map } from 'stilr';

const map = new Map();

export const getCss = () => render(undefined, map);

export default class StyleSheet {
  static create(styles) {
    const sheet = create(styles, map);
    sheet.getStyles = () => styles;
    return sheet;
  }
}
