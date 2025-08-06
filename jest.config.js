/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

const nextJest = require('next/jest')
 
/** @type {import('jest').Config} */

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

const config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transformIgnorePatterns: ["/node_modules/(?!(mongodb)/)"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^@component/(.*)$": "<rootDir>/component/$1",
    "^@app/(.*)$": "<rootDir>/app/$1",
  },
};

module.exports = createJestConfig(config);
