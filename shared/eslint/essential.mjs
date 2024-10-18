import eslint from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';

/**
 * @type {import('eslint').Linter.Config[]}
 */
const config = [
  {
    // TODO: 「**/*eslint*」の定義が必要かを後で確認する
    ignores: ['**/dist/**', '**/*eslint*'],
  },
  eslint.configs.recommended,
  {
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              // 相対パスを禁止
              group: ['./', '../'],
            },
          ],
        },
      ],
      'no-restricted-syntax': [
        'error',
        // https://qiita.com/hey_cube/items/28fea3b7ac2ee354c03b
        {
          selector: "NewExpression[callee.name='Date']",
          message: 'Use getCurrentDate when to get the current date. Otherwise, use date-fns instead.',
        },
        {
          selector: "CallExpression[callee.object.name='Date']",
          message: 'Use getCurrentDate when to get the current date. Otherwise, use date-fns instead.',
        },
      ],
    },
  },
  {
    files: ['**/eslint.config.mjs', '**/eslint/**/*', '.eslintrc.*'],
    rules: {
      'no-restricted-imports': 'off',
    },
  },
  prettierConfig,
];

export default config;
