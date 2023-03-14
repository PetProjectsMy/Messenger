const { htmlConfig, tsConfig, jsConfig } = require("./overrides");

const config = {
  ignorePatterns: ["build/", "node_modules/"],
  root: true,
  env: {
    node: true,
    browser: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
  },
  overrides: [htmlConfig, jsConfig, tsConfig],
};

module.exports = config;
