import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import nextPlugin from "@next/eslint-plugin-next";

const compat = new FlatCompat({
  baseConfig: {
    env: {
      browser: true,
      es2022: true,
      node: true,
    },
    extends: [
      "eslint:recommended",
      "@typescript-eslint/recommended",
      "next/core-web-vitals",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
    },
    plugins: ["@typescript-eslint", "next"],
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
});

export default [
  js.configs.recommended,
  ...compat.extends("next/core-web-vitals"),
  ...typescript.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: typescriptParser,
    },
    plugins: {
      "@typescript-eslint": typescript,
      next: nextPlugin,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
];
