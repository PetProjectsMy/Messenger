import type { Config as jestConfig } from "jest";

const config: jestConfig = {
  clearMocks: true,
  testEnvironment: "jsdom",
  rootDir: "../../",
  coveragePathIgnorePatterns: ["<rootDir>/build/", "<rootDir>/node_modules/"],
};

export default config;
