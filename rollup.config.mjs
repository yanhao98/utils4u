import { defineConfig } from 'rollup';
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import pkg from './package.json' assert { type: 'json' };

const input = 'src/index.ts';

const config = defineConfig([
  {
    input,
    output: [
      { file: pkg.main, format: 'es', sourcemap: true },
    ],
    external: ['vite'],
    plugins: [
      esbuild()
    ],
  },
  {
    input,
    output: [{ file: pkg.types, format: 'es' }],
    external: ['vite'],
    plugins: [
      dts({
        respectExternal: true,
      })
    ],
  },
]);

export default config;
