import unjs from 'eslint-config-unjs';

export default unjs({
  ignores: [
    // ignore paths
    './.rslib',
    './.rslib-output',
  ],
  rules: {
    // rule overrides
    'unicorn/no-console-spaces': 'off',
  },
  markdown: {
    rules: {
      // markdown rule overrides
    },
  },
});
