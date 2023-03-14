const elsintConfigFilesOverride = {
  files: ["*.js", "*.cjs"],
  parserOptions: {
    sourceType: "commonjs",
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
};

module.exports = elsintConfigFilesOverride;
