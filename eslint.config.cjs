const { fixupConfigRules } = require("@eslint/compat");
const { FlatCompat } = require("@eslint/eslintrc");
const js = require("@eslint/js");
const tsParser = require("@typescript-eslint/parser");
const { defineConfig, globalIgnores } = require("eslint/config");
const prettier = require("eslint-plugin-prettier");
const reactCompiler = require("eslint-plugin-react-compiler");
const reactRefresh = require("eslint-plugin-react-refresh");
const globals = require("globals");

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

module.exports = defineConfig([
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: tsParser,
    },

    extends: fixupConfigRules(
      compat.extends(
        "next",
        "prettier",
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended"
      )
    ),

    plugins: {
      prettier,
      "react-refresh": reactRefresh,
      "react-compiler": reactCompiler,
    },

    rules: {
      "react-compiler/react-compiler": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-redeclare": "error",
      "react-hooks/exhaustive-deps": "off",
      "max-lines": ["error", 300],
      "import/named": "error",

      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["sibling", "parent"],
            "index",
            "unknown",
          ],

          "newlines-between": "always",

          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  globalIgnores(["**/.next", "**/eslint.config.cjs", "**/custom-formatter.js"]),
]);
