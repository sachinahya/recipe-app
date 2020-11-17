module.exports = {
  collectCoverageFrom: [
    'src/!(test)/**/*.ts',
    'src/!(test)/**/*.tsx',
    '!src/**/*.d.ts',
    '!src/**/*.gql.ts',
    '!src/**/*.stories.tsx',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'lcov', 'text', 'cobertura'],
  projects: ['<rootDir>/packages/*'],
  rootDir: __dirname,
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
};
