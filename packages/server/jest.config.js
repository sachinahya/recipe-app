const path = require('path');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  moduleDirectories: [
    'node_modules',
    compilerOptions.baseUrl != null && path.join(__dirname, compilerOptions.baseUrl),
  ].filter(Boolean),
  setupFilesAfterEnv: [path.join(__dirname, 'src/test/jest.setup.ts')],
  testEnvironment: 'node',
  transformIgnorePatterns: ['node_modules/(?!(@sachinahya/utils)/)'],
};
