import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import * as typescriptParser from '@typescript-eslint/parser';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
  },
  {
    languageOptions: {
      globals: globals.browser,
      parser: typescriptParser,
    },
  },
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  {
    rules: {
      'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
    },
  },
  {
    ignores: ['node_modules/', 'dist/', 'prisma/', 'frontend/', '**/generated/'],
  },
];
