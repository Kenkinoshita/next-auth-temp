module.exports = {
  '**/*.{ts,tsx,js,cjs}': [
    // prettier
    (filenames) => `prettier --write --ignore-path .gitignore ${filenames.join(' ')}`,
    // eslint
    `eslint --fix --cache`,
  ],
  '**/*.md': 'prettier --list-different',
};
