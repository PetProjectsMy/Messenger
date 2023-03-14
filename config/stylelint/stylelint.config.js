module.exports = {
  extends: [
    "stylelint-config-clean-order",
    "stylelint-config-recommended-less",
  ],
  plugins: ["stylelint-order", "stylelint-less"],
  customSyntax: "postcss-less",
  rules: {
    "no-descending-specificity": null,
    "no-extra-semicolons": null,
  },
};
