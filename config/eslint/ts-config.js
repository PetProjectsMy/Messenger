const rules = {
  "no-underscore-dangle": "off",
  "no-continue": "off",
  "no-unused-vars": ["error", { args: "after-used" }],
  "no-restricted-syntax": ["warn", { selector: "ForInStatement" }],
  "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
  "import/no-import-module-exports": "off",
  "import/prefer-default-export": "off",
  "class-methods-use-this": "off",
  "no-param-reassign": "off",
  "@typescript-eslint/no-useless-constructor": "off",
  "no-plusplus": "off",
  "max-classes-per-file": "off",
  "func-names": "off",
};

export const tsConfig = {
  files: ["*.ts"],
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ["@typescript-eslint", "prettier"],
  extends: [
    "airbnb",
    "airbnb-typescript",
    "plugin:react/recommended",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: "module",
    project: ["tsconfig.json"],
  },
  rules,
};
