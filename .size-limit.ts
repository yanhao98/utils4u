import type { SizeLimitConfig } from 'size-limit';

module.exports = [
  {
    path: ['dist/**/index.js', '!dist/vite/**'],
    limit: '1 s',
  },
] satisfies SizeLimitConfig;
