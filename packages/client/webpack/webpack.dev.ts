import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { readFileSync } from 'fs';
import { join } from 'path';
import {
  Configuration as WebpackConfiguration,
  HotModuleReplacementPlugin,
  WebpackPluginInstance,
} from 'webpack';
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { merge } from 'webpack-merge';

import common from './webpack.common';

const isDevServer = process.env.WEBPACK_DEV_SERVER === 'true';

interface DevServerHttpsConfiguration {
  key?: Buffer;
  cert?: Buffer;
}

const config: WebpackConfiguration & {
  devServer: DevServerConfiguration & DevServerHttpsConfiguration;
} = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].chunk.js',
  },
  plugins: [
    isDevServer && new HotModuleReplacementPlugin(),
    isDevServer && new ReactRefreshWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: './src/**/*.{ts,tsx,js,jsx}',
        options: {
          failOnError: true,
        },
      },
    }),
  ].filter(Boolean) as WebpackPluginInstance[],
  devServer: {
    clientLogLevel: 'silent',
    historyApiFallback: true,
    hot: true,
    overlay: true,
    port: 3000,
    transportMode: 'ws',
    https: true,
    contentBase: './public',
    key: readFileSync(join(__dirname, '../../../cert/localhost-key.pem')),
    cert: readFileSync(join(__dirname, '../../../cert/localhost.pem')),
  },
};

export default merge<WebpackConfiguration>(common, config);
