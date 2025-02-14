import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import typescriptParser from '@typescript-eslint/parser';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['client/**/*.{ts}', 'client/**/*.{jsx,tsx}'],
    env: {
      node: true,
      es2021: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'prettier',
    ],
    parser: '@typescript-eslint/parser',
    languageOptions: {
      globals: globals.browser,
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'react', 'prettier'],
    settings: {
      'import/resolver': {
        typescript: {},
      },
    },
  },
  {
    files: ['server/**/*.ts'],
    env: {
      node: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
    ],
    plugins: ['@typescript-eslint', 'prettier'],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: 'latest',
    },
  },
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  {
    ignores: [
      '**/node_modules/',
      '**/dist/',
      '**/prisma/',
      '**/assets/',
      '**/types/',
      '**/*.d.ts',
      '**/dev_embed.js',
      './github',
      './husky',
      './prettierrc',
      './prettierignore',
    ],
  },
];
