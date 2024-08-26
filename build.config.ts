import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: ['src/index', 'src/vite/index', 'src/vue-router/index'],
  clean: true,
  declaration: true,
  externals: ['vite', 'vue-router', 'nprogress'],
});
