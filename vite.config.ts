import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import { globSync } from 'tinyglobby';
import pkg from './package.json';

const entry = globSync('src/**/index.ts').reduce<Record<string, string>>((acc, file) => {
  const key = file.replace('src/', '').replace('.ts', '');
  acc[key] = fileURLToPath(new URL(`./${file}`, import.meta.url));
  return acc;
}, {});
console.debug(`entry :>> `, entry);

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),

    // https://github.com/matronator/vite-ts-lib-starter/blob/29a77933d368e2f19a14b05e24a6bb570a2390e0/dts-bundle-generator.config.ts
    dts({ tsconfigPath: './tsconfig.app.json' /* , rollupTypes: true */ }),
  ],
  build: {
    minify: 'terser',
    lib: { entry, formats: ['es'] },
    rollupOptions: {
      external: [...Object.keys(pkg.peerDependencies), ...Object.keys(pkg.devDependencies)],
      /* output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
      }, */
    },
  },
});
