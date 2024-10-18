import frontend from './shared/eslint/frontend.config.mjs';

/**
 * @type {import('eslint').Linter.Config[]}
 */
const config = [...frontend];

export default config;
