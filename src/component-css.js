/* eslint global-require:0 */
import CleanCSS from 'clean-css';
import autoprefixer from 'autoprefixer';
import postcss from 'postcss';

export default function getComponentCss(minify: boolean): string {
  require('./component');
  const {getCss} = require('./component/styles');

  const source = getCss({pretty: !minify});
  const css = String(postcss([autoprefixer]).process(source));
  return minify ? new CleanCSS().minify(css).styles : css;
}
