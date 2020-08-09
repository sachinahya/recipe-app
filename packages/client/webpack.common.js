const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const webpack = require('webpack');

const cssRegex = /.css$/;
const jsRegex = /\.([jt]sx?|[cm]js)$/;
const svgRegex = /\.svg$/;

/**
 * @type {webpack.Configuration}
 */
module.exports = {
  entry: './src/index',
  stats: 'errors-warnings',
  output: {
    path: path.resolve('./dist'),
    futureEmitAssets: true,
    publicPath: '/',
  },
  optimization: {
    splitChunks: { chunks: 'all' },
    noEmitOnErrors: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.mjs', '.cjs'],
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
  },
  module: {
    rules: [
      {
        test: jsRegex,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
        options: {
          rootMode: 'upward',
          cacheDirectory: true,
          cacheCompression: false,
          compact: false,
        },
        sideEffects: false,
      },
      {
        test: svgRegex,
        loader: require.resolve('@svgr/webpack'),
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './public/**/!(index.html)',
        },
      ],
    }),
    new CleanWebpackPlugin(),
    new Dotenv({ path: '../../.env' }),
    new webpack.DefinePlugin({
      'process.env': {
        WEBPACK_DEV_SERVER: JSON.stringify(process.env.WEBPACK_DEV_SERVER),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
