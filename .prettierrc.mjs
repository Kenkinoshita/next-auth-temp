import sharedConfig from './shared/.prettierrc.js';

/**
 * prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  ...sharedConfig,
};

export default config;
