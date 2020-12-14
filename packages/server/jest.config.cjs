module.exports = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/src/test/jest.setup.ts'],
  transformIgnorePatterns: ['node_modules/(?!(@sachinahya/*)/)'],
};
