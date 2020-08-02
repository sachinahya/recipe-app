const fs = require('fs');
const path = require('path');
const isCI = require('is-ci');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const WebpackBar = require('webpackbar');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const jsRegex = /\.([jt]sx?|[cm]js)$/;
const cssRegex = /.css$/;
const svgRegex = /\.svg$/;

const isDevServer = process.env.WEBPACK_DEV_SERVER === 'true';

const isProduction = (NODE_ENV => {
  if (!NODE_ENV) {
    throw new Error('NODE_ENV environment variable is required but was not provided.');
  }

  if (!['development', 'production'].includes(NODE_ENV)) {
    throw new Error(
      'NODE_ENV environment variable must be set to either "development" or "production" in order to run build.'
    );
  }

  return NODE_ENV === 'production';
})(process.env.NODE_ENV);

/**
 * @type {webpack.Configuration}
 */
module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: './src/index',
  stats: 'errors-warnings',
  devtool: isProduction ? 'source-map' : 'cheap-module-source-map',

  output: {
    path: path.resolve('./dist'),
    filename: isProduction ? 'js/[name].[contenthash:8].js' : 'js/[name].js',
    chunkFilename: isProduction ? 'js/[name].[contenthash:8].chunk.js' : 'js/[name].chunk.js',
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
        loader: require.resolve('eslint-loader'),
        options: {
          failOnError: true,
          failOnWarning: isCI,
        },
        enforce: 'pre',
      },
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
      {
        test: cssRegex,
        use: [
          isProduction
            ? { loader: MiniCssExtractPlugin.loader }
            : { loader: require.resolve('style-loader') },
          {
            loader: require.resolve('css-loader'),
            options: {
              modules: true,
              sourceMap: true,
              esModule: true,
            },
          },
        ],
        sideEffects: false,
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
    isProduction &&
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: 'bundle-report.html',
        openAnalyzer: false,
      }),
    isDevServer && new webpack.HotModuleReplacementPlugin(),
    isDevServer && new ReactRefreshWebpackPlugin(),
    new CleanWebpackPlugin(),
    new Dotenv({ path: '../../.env' }),
    new webpack.DefinePlugin({
      'process.env': {
        WEBPACK_DEV_SERVER: JSON.stringify(process.env.WEBPACK_DEV_SERVER),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new WebpackBar(),
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].chunk.css',
    }),
    !isDevServer &&
      new WorkboxPlugin.GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
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
    key: fs.readFileSync('./cert/localhost.key'),
    cert: fs.readFileSync('./cert/localhost.crt'),

    // quiet: true,
    /* proxy: {
      '/api': {
        target: 'http://localhost:4000',
        // pathRewrite: { '^/api': '' },
        // secure: false
      },
    }, */
    // noInfo: true,
    // contentBase: './dist'
  },
};
