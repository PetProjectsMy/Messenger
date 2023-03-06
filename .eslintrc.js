const htmlConfig = require("./config/eslint/html-config");
const commonjsConfig = require("./config/eslint/commonjs-config");
const tsConfig = require("./config/eslint/ts-config");

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
  overrides: [htmlConfig, commonjsConfig, tsConfig],
};

module.exports = config;
