import js from "@eslint/js";
import globals from "globals";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import unusedImports from "eslint-plugin-unused-imports";

export default [
  js.configs.recommended,

  {
    files: ["src/**/*.{js,jsx}"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      "unused-imports": unusedImports,
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
  "no-unused-vars": "off",
  "unused-imports/no-unused-imports": "error",
  "unused-imports/no-unused-vars": [
    "warn",
    { vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_" }
  ],
  "no-console": ["warn", { allow: ["warn", "error"] }],
  "react/react-in-jsx-scope": "off",
  "react/jsx-uses-vars": "error",
  "react-hooks/rules-of-hooks": "error",
  "react-hooks/exhaustive-deps": "warn",
},

  },

  {
    files: ["**/*.test.js"],

    languageOptions: {
      globals: {
        describe: "readonly",
        test: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        jest: "readonly",
      },
    },
  },

  {
    ignores: [
      "build/",
      "node_modules/",
      "coverage/",
      "*.config.js",
      "*.config.cjs",
    ],
  },
];