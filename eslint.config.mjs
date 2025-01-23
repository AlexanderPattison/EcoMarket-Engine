// eslint.config.mjs
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptEslintParser from '@typescript-eslint/parser';
import globals from 'globals';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  js.configs.recommended,
  ...compat.extends(
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ),
  {
    // Configuration for TypeScript files
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        project: ['./backend/tsconfig.json', './frontend/tsconfig.json'],
        tsconfigRootDir: __dirname,
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
        module: 'readonly',
        __dirname: 'readonly',
        exports: 'readonly',
        require: 'readonly',
        process: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        localStorage: 'readonly',
        document: 'readonly',
        alert: 'readonly',
        setTimeout: 'readonly',
      },
    },
    rules: {
      ...typescriptEslintPlugin.configs['eslint-recommended'].rules,
      ...typescriptEslintPlugin.configs['recommended'].rules,
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      // Allow CommonJS imports
      '@typescript-eslint/no-require-imports': 'off',
      'no-undef': ['error', { typeof: true }],
      '@typescript-eslint/no-this-alias': 'off',
    },
  },
  {
    // Configuration for JavaScript files
    files: ['**/*.js'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        require: 'readonly',
      },
    },
    rules: {
      'no-undef': ['error', { typeof: true }],
      // Allow require imports in JS files
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    ignores: ['backend/dist/**', 'node_modules/**'],
  },
];
