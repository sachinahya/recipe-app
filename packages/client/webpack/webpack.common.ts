import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { resolve } from 'path';
import { Configuration, EnvironmentPlugin, WebpackPluginInstance } from 'webpack';

const jsRegex = /\.([jt]sx?|[cm]js)$/;
const svgRegex = /\.svg$/;

const config: Configuration = {
  entry: './src/index',
  stats: 'errors-warnings',
  output: {
    path: resolve('./dist'),
    publicPath: '/',
  },
  optimization: {
    splitChunks: { chunks: 'all' },
    emitOnErrors: false,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.mjs', '.cjs'],
  },
  module: {
    rules: [
      {
        test: /\.m?js/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: jsRegex,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          cacheCompression: false,
          rootMode: 'upward',
          compact: false,
        },
        sideEffects: false,
      },
      {
        test: svgRegex,
        loader: '@svgr/webpack',
      },
    ],
  },
  plugins: [
    new EnvironmentPlugin({
      NODE_ENV: undefined,
      WEBPACK_DEV_SERVER: 'false',
      RA_CLIENT_GRAPHQL_URI: undefined,
      RA_CLIENT_GOOGLE_OAUTH_URI: undefined,
      RA_CLIENT_GRAPHQL_CREDENTIALS: undefined,
    }),
    (new CopyWebpackPlugin({
      patterns: [
        {
          from: './public/**/!(index.html)',
        },
      ],
    }) as unknown) as WebpackPluginInstance,
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

export default config;
