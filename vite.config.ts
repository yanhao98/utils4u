import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import { globSync } from 'tinyglobby';
import pkg from './package.json';
const externalDeps = [...Object.keys(pkg.peerDependencies), ...Object.keys(pkg.devDependencies)];

const entry = globSync('src/**/index.ts').reduce<Record<string, string>>((acc, file) => {
  const key = file.replace('src/', '').replace('.ts', '');
  acc[key] = fileURLToPath(new URL(`./${file}`, import.meta.url));
  return acc;
}, {});

{
  type ExportConfig = Record<
    string,
    {
      types: string;
      default: string;
    }
  >;
  const exports = globSync('src/**/index.ts').reduce<ExportConfig>(
    (acc, file) => {
      const key = file.replace('src/', '').replace('.ts', '');
      acc[`./${key.replace('/index', '')}`] = {
        types: `./dist/${key}.d.ts`,
        default: `./dist/${key}.js`,
      };
      return acc;
    },
    { '.': { types: './dist/index.d.ts', default: './dist/index.js' } },
  );
  delete exports['./index'];
  Object.assign(pkg, { exports, types: './dist/index.d.ts', module: './dist/index.js', main: './dist/index.js' });
  import('fs/promises').then((fs) => fs.writeFile('package.json', JSON.stringify(pkg, null, 2) + '\n'));
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),

    // https://github.com/matronator/vite-ts-lib-starter/blob/29a77933d368e2f19a14b05e24a6bb570a2390e0/dts-bundle-generator.config.ts
    dts({ tsconfigPath: './tsconfig.app.json' /* , rollupTypes: true */ }),
  ],
  build: {
    sourcemap: true,
    minify: 'terser',
    lib: { entry, formats: ['es'] },
    rollupOptions: {
      // external: externalDeps,
      external: (source /* , importer, isResolved */) => externalDeps.some((dep) => source.startsWith(dep)),
      output: {
        // assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
      },
    },
  },
});
