/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageDirectory: "coverage",
  testEnvironment: 'node',
  coverageProvider: "v8",
  transform: {
    '.+\\.ts$': 'ts-jest'
  }

};

module.exports = config;
