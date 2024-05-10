/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  modulePathIgnorePatterns: ["src/pages/test.tsx"],
  testEnvironment: "jsdom",
  roots: ["<rootDir>/src"],
  preset: "ts-jest",
}

module.exports = config
