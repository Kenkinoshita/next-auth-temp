import plugin from '@next/eslint-plugin-next';

/**
 * @type {import('eslint').Linter.Config[]}
 */
const configs = [
  {
    plugins: {
      '@next/next': plugin,
    },
    rules: {
      ...plugin.configs.recommended.rules,
      ...plugin.configs['core-web-vitals'].rules,
    },
  },
  {
    ignores: ['./.next/*'],
  },
];

export default configs;
