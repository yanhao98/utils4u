import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: ['src/index', 'src/vite/index'],
  clean: true,
  declaration: true,
  externals: ['vite'],
});
