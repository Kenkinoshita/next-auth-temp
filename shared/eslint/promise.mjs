import plugin from 'eslint-plugin-promise';

/**
 * @type {import('eslint').Linter.Config}
 */
const config = {
  plugins: {
    promise: plugin,
  },
  rules: {
    ...plugin.configs.recommended.rules,
  },
};

export default config;
