module.exports = {
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/src/test/imageStub.js',
  },
  setupFiles: ['dotenv/config'],
  setupFilesAfterEnv: ['<rootDir>/src/test/jest.setup.ts'],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!(@sachinahya/*)/)'],
};
