const rules = {
  "no-underscore-dangle": "off",
  "no-console": "off",
  "no-continue": "off",
  "no-unused-vars": "off",
  "import/no-import-module-exports": "off",
  "import/prefer-default-export": "off",
  "class-methods-use-this": "off",
  "no-param-reassign": "off",
  "@typescript-eslint/no-useless-constructor": "off",
  "@typescript-eslint/no-namespace": "off",
  "no-plusplus": "off",
  "max-classes-per-file": "off",
  "func-names": "off",
};

const tsConfig = {
  files: ["*.ts"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: "module",
    project: ["tsconfig.json"],
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  rules,
};

module.exports = tsConfig;
