module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  ignorePatterns: [
    '.yarn',
    '.pnp.cjs',
    '**/node_modules/**',
    '**/packages/**/node_modules/**',
    '**/packages/*/dist/**',
    '**/coverage/**',
    '*.gql.ts',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.eslint.json'],
    extraFileExtensions: ['.cjs', '.mjs'],
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'import', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:jsdoc/recommended',
    'prettier',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/typescript',
    'prettier/@typescript-eslint',
  ],
  rules: {
    eqeqeq: ['error', 'smart'],
    'import/no-named-as-default': 'warn',
    'import/no-named-as-default-member': 'warn',
    'import/no-commonjs': 'error',
    'import/no-duplicates': 'warn',
    'import/no-mutable-exports': 'error',
    'jsdoc/check-alignment': 'off',
    'jsdoc/require-jsdoc': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',

    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        ignoreRestSiblings: true,
        varsIgnorePattern: '_(QUERY|MUTATION|FRAGMENT)$',
      },
    ],
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/unbound-method': 'off',
  },
  overrides: [
    {
      // TypeScript
      files: '**/*.{ts,tsx}',
      rules: {
        'no-undef': 'off',
        'jsdoc/require-param-type': 'off',
        'jsdoc/require-returns-type': 'off',
      },
    },
    {
      // JavaScript
      files: '**/*.{js,cjs,mjs}',
      rules: {
        'import/no-unresolved': 'error',
        'import/named': 'error',
        'import/namespace': 'error',
        'import/default': 'error',
        'import/export': 'error',
      },
    },
    {
      // JavaScript (.cjs)
      files: '**/*.cjs',
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        'import/no-commonjs': 'off',
      },
    },
    {
      files: 'packages/client/**',
      extends: ['plugin:react/recommended', 'prettier/react'],
      rules: {
        'react/jsx-uses-react': 'off',
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
      },
      settings: {
        react: {
          version: 'latest',
          linkComponents: [
            'Hyperlink',
            {
              name: 'Link',
              linkAttribute: 'to',
            },
          ],
        },
      },
    },
    {
      // Entity/resolver
      files: 'packages/server/src/?(entities|resolvers)/**/*.ts',
      rules: {
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            argsIgnorePattern: '^(of|type|returns)$',
            ignoreRestSiblings: true,
          },
        ],
      },
    },
    {
      // Test files
      files: 'packages/*/test/**',
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
  settings: {
    jsdoc: {
      mode: 'typescript',
    },
  },
};
