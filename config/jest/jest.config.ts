import type { Config as jestConfig } from "jest";

const esModules = ["nanoid"].join("|");

const config: jestConfig = {
  preset: "ts-jest/presets/js-with-ts",
  testEnvironment: "jest-environment-jsdom",
  clearMocks: true,
  rootDir: "../../",
  modulePaths: ["<rootDir>/src"],
  coveragePathIgnorePatterns: ["<rootDir>/build/", "<rootDir>/node_modules/"],
  transformIgnorePatterns: [`node_modules/(?!${esModules})`],
};

export default config;
