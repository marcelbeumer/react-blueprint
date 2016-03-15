import StyleSheet from 'stilr';
import React from 'react';
import autoprefixer from 'autoprefixer';
import postcss from 'postcss';

const map = new StyleSheet.Map();
const { matchMedia } = global;

export const getCss = ({ pretty = false } = {}) => StyleSheet.render({ pretty }, map);

if (module.hot) {
  let lastStyle;
  React.Component.prototype.stilrHotReload = () => {
    const style = document.createElement('style');
    const css = postcss(autoprefixer()).process(getCss()).css;
    style.textContent = css;
    document.getElementsByTagName('head')[0].appendChild(style);

    if (lastStyle) lastStyle.parentNode.removeChild(lastStyle);
    lastStyle = style;
  };
}

export default class StyleSheetWrapper {
  static create(styles) {
    const sheet = StyleSheet.create(styles, map);
    sheet.getStyles = () => styles;
    return sheet;
  }
}

export function resolveMedia(styles) {
  if (!matchMedia) throw new Error('cant resolve media on non browser environment');
  const merged = {};
  Object.keys(styles).forEach(key => {
    if (/@media /.test(key)) {
      if (matchMedia(key.replace('@media ', '')).matches) {
        Object.assign(merged, styles[key]);
      }
    } else {
      merged[key] = styles[key];
    }
  });
  return merged;
}

export const px = val => `${val}px`;
export const em = val => `${val}em`;
export const rem = val => `${val}rem`;
export const perc = val => `${val}%`;
export const vh = val => `${val}vh`;
export const vw = val => `${val}vw`;
