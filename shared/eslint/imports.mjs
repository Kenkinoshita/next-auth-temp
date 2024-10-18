import plugin from 'eslint-plugin-import';

/**
 * @type {import('eslint').Linter.Config}
 */
const config = {
  plugins: {
    import: plugin,
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
    'import/extensions': ['js', 'jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['js', 'jsx', '.ts', '.tsx'],
    },
  },
  rules: {
    ...plugin.configs.recommended.rules,
    ...plugin.configs.errors.rules,
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
        },

        'newlines-between': 'always',
      },
    ],
  },
};

export default config;
