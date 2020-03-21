const { defaults } = require('jest-config');

module.exports = {
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
  projects: ['packages/*'],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  // transformIgnorePatterns: ['node_modules/(?!(@sachinahya/utils)/)'],
};
