module.exports = {
  extends: [
    "stylelint-config-recess-order",
    "stylelint-config-recommended-scss",
  ],
  rules: {
    "alpha-value-notation": "number",
    "at-rule-empty-line-before": [
      "always",
      {
        except: ["blockless-after-same-name-blockless", "first-nested"],
        ignore: ["after-comment"],
        ignoreAtRules: ["else"],
      },
    ],
    "color-function-notation": "legacy",
    "color-named": "never",
    "font-weight-notation": "numeric",
    "no-descending-specificity": null,
    "no-invalid-position-at-import-rule": null,
    "selector-class-pattern": null,
    "selector-pseudo-element-colon-notation": "double",
    "scss/selector-no-union-class-name": true,
  },
  ignoreFiles: ["**/node_modules/**"],
};
