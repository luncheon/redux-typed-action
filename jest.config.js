// https://facebook.github.io/jest/docs/en/configuration.html
module.exports = {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/**/*.spec.ts'],
  transform: {
    '\\.ts$': '<rootDir>/node_modules/ts-jest/preprocessor.js'
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  moduleNameMapper: {
    '^redux-typed-action$': '<rootDir>',
  },
  collectCoverage: true,
}
