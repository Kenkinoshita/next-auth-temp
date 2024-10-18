import essentialConfigs from './essential.mjs';
import importsConfig from './imports.mjs';
import promiseConfig from './promise.mjs';
import typescriptConfigs from './typescript.mjs';

/**
 * @type {import('eslint').Linter.Config[]}
 */
const config = [
  ...essentialConfigs,
  importsConfig,
  ...typescriptConfigs,
  promiseConfig,
  {
    rules: {
      'import/no-unresolved': ['error', { ignore: ['aws-lambda', 'xlsx'] }],
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'date-fns',
              importNames: ['format'],
              message: 'use dateStringToDate instead.',
            },
          ],
          patterns: [
            ...essentialConfigs[2].rules['no-restricted-imports'][1].patterns,
            {
              group: ['*/getAWSRDSConnection', '*/getLocalMysqlConnection'],
              message: 'use getDBConnection instead.',
            },
          ],
        },
      ],
    },
  },
];

export default config;
