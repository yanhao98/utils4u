import { defineConfig } from "rollup";
import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";
// import pkg from "./package.json" assert { type: "json" };

const config = defineConfig([
  {
    input: "src/index.ts",
    output: [
      {
        // file: pkg.main,
        file: "dist/index.cjs",
        format: "cjs",
      },
      {
        // file: pkg.module,
        file: "dist/index.mjs",
        format: "es",
      },
    ],
    external: ["vite"],
    plugins: [esbuild()],
  },
  {
    input: "src/index.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts()],
  },
]);

export default config;
