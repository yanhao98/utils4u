// https://github.com/youzan/vant/blob/main/packages/vant-use/build.js

import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: [
    'src/index.ts',
    'src/vite/index.ts',
    'src/vue-router/index.ts',
    'src/rollup/index.ts',
    'src/vue-use/index.ts',
  ],
  clean: false,
  declaration: true,
  externals: ['vite', 'vue-router', 'nprogress', 'rollup', 'pinyin-pro', 'vue', '@vueuse/core'],
});
