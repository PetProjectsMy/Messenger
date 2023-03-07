import type { Config as jestConfig } from "jest";

const config: jestConfig = {
  preset: "ts-jest",
  testEnvironment: "node",
  clearMocks: true,
  rootDir: "../../",
  coveragePathIgnorePatterns: ["<rootDir>/build/", "<rootDir>/node_modules/"],
};

export default config;
