import { render, create } from 'stilr';

export const getCss = () => render();

export default class StyleSheet {
  static create(styles) {
    const sheet = create(styles);
    sheet.getStyles = () => styles;
    return sheet;
  }
}
