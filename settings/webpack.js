/* eslint no-param-reassign:0 */
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import cssnext from 'postcss-cssnext';
import cssImport from 'postcss-import';
import cssUrl from 'postcss-import';
import env from 'node-env';
import webpack from 'webpack';

const prod = env === 'production';
const compressJs = prod;
const extractCss = true;

const cssPipeline = [
  'style-loader',
  prod ? 'css-loader?minimize' : 'css-loader',
  'postcss-loader',
];

const config = {
  context: `${__dirname}/../src`,
  entry: {
    app: ['./browser.js'],
    vendor: ['react', 'react-dom', 'immutable', 'react-hammerjs', 'stilr', 'redux'],
  },
  output: {
    path: `${__dirname}/../dist/asset`,
    filename: 'bundle.js',
    publicPath: '/asset',
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
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${env}"`,
    }),
  ],
};

if (extractCss) {
  config.plugins.push(
    new ExtractTextPlugin('bundle.css'),
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
