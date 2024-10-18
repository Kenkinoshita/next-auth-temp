module.exports = {
  '*.{ts,tsx}': [
    // TypeCheck
    `bash -c 'npm run check-type'`,
  ],
  '*.{ts,tsx,js,cjs}': [
    // prettier
    (filenames) => `prettier --write --ignore-path .gitignore ${filenames.join(' ')}`,
    // eslint
    `eslint --fix --cache --ignore-pattern .lintstagedrc.cjs`,
  ],
  '*.md': 'prettier --list-different',
};
