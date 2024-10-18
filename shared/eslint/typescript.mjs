import typescript from 'typescript-eslint';

/**
 * @type {import('eslint').Linter.Config}
 */
const customConfig = {
  plugins: {
    '@typescript-eslint': typescript.plugin,
  },
  languageOptions: {
    parser: typescript.parser,
    parserOptions: {
      project: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
      },
    ],
  },
};

const configs = typescript.config(...typescript.configs.recommended, customConfig);

export default configs;
