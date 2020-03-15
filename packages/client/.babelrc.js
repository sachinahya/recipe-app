module.exports = api => ({
  presets: [
    [
      '@babel/preset-react',
      {
        development: api.env('development'),
        useBuiltIns: true,
      },
    ],
  ],
  plugins: [
    // Needs to be specified first within each "env" so that it executes first.
    // https://styled-components.com/docs/tooling#babel-plugin
    [
      'babel-plugin-styled-components',
      {
        pure: true,
        minify: true,
        transpileTemplateLiterals: true,
      },
    ],
    /**
     * Use the latest version of the runtime for a smaller bundle size.
     * https://babeljs.io/docs/en/babel-plugin-transform-runtime#version
     */
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false,
        // Although this creates a slightly larger file, after GZip there is no difference.
        // useESModules: true,
        version: require('@babel/runtime/package.json').version,
      },
    ],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    'babel-plugin-dev-expression',
    api.env('development') && 'react-refresh/babel',
    'babel-plugin-transform-compress-graphql',
    !api.env('test') && [
      'babel-plugin-import',
      {
        libraryName: '@material-ui/core',
        libraryDirectory: 'esm',
        camel2DashComponentName: false,
      },
      'core',
    ],
    !api.env('test') && [
      'babel-plugin-import',
      {
        libraryName: '@material-ui/icons',
        libraryDirectory: 'esm',
        camel2DashComponentName: false,
      },
      'icons',
    ],
  ].filter(Boolean),
});
