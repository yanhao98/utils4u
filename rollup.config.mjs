import { defineConfig } from 'rollup';
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import pkg from './package.json' assert { type: 'json' };

const input = 'src/index.ts';

const config = defineConfig([
  {
    input,
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
    external: ['vite'],
    plugins: [esbuild()],
  },
  {
    input,
    output: [{ file: pkg.types, format: 'es' }],
    plugins: [dts()],
  },
]);

export default config;
