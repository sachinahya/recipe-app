const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const fs = require('fs');
const isCI = require('is-ci');
const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const isDevServer = process.env.WEBPACK_DEV_SERVER === 'true';

/**
 * @type {webpack.Configuration}
 */
module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].chunk.js',
  },
  plugins: [
    isDevServer && new webpack.HotModuleReplacementPlugin(),
    isDevServer && new ReactRefreshWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: './src/**/*.{ts,tsx,js,jsx}',
        options: {
          failOnError: true,
          failOnWarning: isCI,
        },
      },
    }),
  ].filter(Boolean),
  devServer: {
    clientLogLevel: 'silent',
    historyApiFallback: true,
    hot: true,
    overlay: true,
    port: 3000,
    transportMode: 'ws',
    https: true,
    contentBase: './public',
    key: fs.readFileSync(path.join(__dirname, '../../cert/localhost-key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../../cert/localhost.pem')),
  },
});
