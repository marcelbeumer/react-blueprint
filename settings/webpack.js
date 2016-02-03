import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import cssnext from 'postcss-cssnext';
import env from 'node-env';

const cssPipeline = ['style-loader', 'css-loader', 'postcss-loader'];
const extractCss = env === 'production';

const config = {
  context: `${__dirname}/../src`,
  entry: ['./browser.js'],
  output: {
    path: `${__dirname}/../dist`,
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css/,
        loader: extractCss ?
          ExtractTextPlugin.extract(cssPipeline[0], cssPipeline.slice(1)) :
          cssPipeline.join('!'),
      },
    ],
  },
  postcss: () => [cssnext],
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      hash: true,
    }),
  ],
};

if (extractCss) {
  config.plugins.push(
    new ExtractTextPlugin('bundle.css')
  );
}

export default config;
