module.exports = api => {
  api.cache.using(() => process.env.NODE_ENV);

  return {
    babelrcRoots: ['.', 'packages/*'],
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
  };
};
