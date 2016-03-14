/* eslint no-param-reassign:0 */
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import cssnext from 'postcss-cssnext';
import cssImport from 'postcss-import';
import cssUrl from 'postcss-import';
import env from 'node-env';
import webpack from 'webpack';

const prod = env === 'production';
const compressJs = prod;
const extractCss = true;
const useCdn = prod;
const useMin = prod;

const cssPipeline = [
  'style-loader',
  prod ? 'css-loader?minimize' : 'css-loader',
  'postcss-loader',
];

const scripts = [
  {
    module: 'react',
    external: 'window.React',
    from: `../node_modules/react/dist/react${useMin ? '.min' : ''}.js`,
    to: `asset/react-__VERSION__${useMin ? '.min' : ''}.js`,
    cdn: 'https://cdn.jsdelivr.net/react/__VERSION__/react.min.js',
  },
  {
    module: 'react-dom',
    external: 'window.ReactDOM',
    from: `../node_modules/react-dom/dist/react-dom${useMin ? '.min' : ''}.js`,
    to: `asset/react-dom-__VERSION__${useMin ? '.min' : ''}.js`,
    cdn: 'https://cdn.jsdelivr.net/react/__VERSION__/react-dom.min.js',
  },
  {
    module: 'immutable',
    external: 'window.Immutable',
    from: `../node_modules/immutable/dist/immutable${useMin ? '.min' : ''}.js`,
    to: `asset/immutable-__VERSION__${useMin ? '.min' : ''}.js`,
    cdn: 'https://cdn.jsdelivr.net/immutable.js/__VERSION__/immutable.min.js',
  },
];

scripts.forEach(script => {
  const version = require(`${script.module}/package.json`).version;
  ['to', 'cdn'].forEach(prop => {
    script[prop] = script[prop].replace('__VERSION__', version);
  });
});

const externals = scripts.reduce((p, c) => {
  p[c.module] = c.external; // eslint-disable-line no-param-reassign
  return p;
}, {});

const config = {
  externals,
  context: `${__dirname}/../src`,
  entry: ['./browser.js'],
  output: {
    path: `${__dirname}/../dist`,
    filename: 'asset/bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: extractCss ?
          ExtractTextPlugin.extract(cssPipeline[0], cssPipeline.slice(1)) :
          cssPipeline.join('!'),
      },
    ],
  },
  postcss: (pack) => [
    cssImport({ addDependencyTo: pack }),
    cssUrl(),
    cssnext(),
  ],
  plugins: [
    new CopyWebpackPlugin(scripts.map(({ from, to }) => ({ from, to }))),
    new HtmlWebpackPlugin({
      scripts: scripts.map(script => useCdn ? script.cdn : script.to),
      template: './index.html',
      hash: true,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${env}"`,
    }),
  ],
};

if (extractCss) {
  config.plugins.push(
    new ExtractTextPlugin('asset/bundle.css')
  );
}

if (compressJs) {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    })
  );
}

export default config;
