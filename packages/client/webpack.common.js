require('dotenv').config({ path: '../../.env' });
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const webpack = require('webpack');

// const cssRegex = /.css$/;
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
    publicPath: '/',
  },
  optimization: {
    splitChunks: { chunks: 'all' },
    emitOnErrors: false,
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
    new webpack.EnvironmentPlugin([
      'NODE_ENV',
      'RA_CLIENT_GRAPHQL_URI',
      'RA_CLIENT_GOOGLE_OAUTH_URI',
      'RA_CLIENT_GRAPHQL_CREDENTIALS',
    ]),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './public/**/!(index.html)',
        },
      ],
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
