module.exports = api => {
  api.cache.using(() => `${process.env.NODE_ENV}|${process.env.WEBPACK_DEV_SERVER}`);

  return {
    presets: [
      [
        '@babel/preset-env',
        api.env('test')
          ? {
              targets: {
                node: 'current',
              },
            }
          : {
              useBuiltIns: 'entry',
              corejs: 3,
              modules: false,
              // This could be an interesting option.
              // esmodules: true,
              exclude: ['transform-typeof-symbol'],
            },
      ],
      [
        '@babel/preset-typescript',
        {
          onlyRemoveTypeImports: true,
        },
      ],
    ],
    overrides: [
      {
        test: 'packages/client/**',
        presets: [
          [
            '@babel/preset-react',
            {
              runtime: 'automatic',
              importSource: '@emotion/react',
              development: api.env('development'),
              useBuiltIns: true,
            },
          ],
        ],
        plugins: [
          '@emotion',
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
          [
            '@babel/plugin-proposal-class-properties',
            {
              loose: true,
            },
          ],
          'babel-plugin-dev-expression',
          process.env.WEBPACK_DEV_SERVER === 'true' && 'react-refresh/babel',
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
      },
    ],
  };
};
