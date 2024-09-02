import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: ['src/index.ts', 'src/vite/index.ts', 'src/vue-router/index.ts', 'src/rollup/index.ts'],
  clean: false,
  declaration: true,
  externals: ['vite', 'vue-router', 'nprogress', 'rollup', 'pinyin-pro'],
});
