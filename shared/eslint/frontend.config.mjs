import { compat } from './compat.mjs';
import essentialConfigs from './essential.mjs';
import importsConfig from './imports.mjs';
import promiseConfig from './promise.mjs';
import reactConfig from './react.mjs';
import typescriptConfigs from './typescript.mjs';
import nextConfigs from './next.mjs';

/**
 * @type {import('eslint').Linter.Config[]}
 */
const config = [
  ...essentialConfigs,
  ...compat.extends('plugin:tailwindcss/recommended', 'plugin:testing-library/react'),
  ...nextConfigs,
  importsConfig,
  ...typescriptConfigs,
  promiseConfig,
  reactConfig,
];

export default config;
