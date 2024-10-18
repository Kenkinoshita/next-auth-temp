import react from 'eslint-plugin-react';
import hooks from 'eslint-plugin-react-hooks';

/**
 * @type {import('eslint').Linter.Config}
 */
const config = {
  plugins: {
    react,
    'react-hooks': hooks,
  },
  languageOptions: {
    ...react.configs.recommended.languageOptions,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    ...react.configs.recommended.rules,
    ...hooks.configs.recommended.rules,
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/exhaustive-deps': 'error',
  },
};

export default config;
