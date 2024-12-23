import { pluginBabel } from '@rsbuild/plugin-babel';
import { pluginVue } from '@rsbuild/plugin-vue';
import { pluginVueJsx } from '@rsbuild/plugin-vue-jsx';
import { build as rslibBuild } from '@rslib/core';
import fs from 'node:fs';
import path from 'node:path';
import { build as unbuild } from 'unbuild';

import { rimrafSync } from 'rimraf';

const rootDir = process.cwd();

function ensureTempOutputDir(): string {
  const TEMP_OUTPUT_DIR = '.rslib-output';
  const dirPath = path.join(process.cwd(), TEMP_OUTPUT_DIR);
  fs.mkdirSync(dirPath, { recursive: true });
  const gitIgnorePath = path.join(process.cwd(), TEMP_OUTPUT_DIR, '.gitignore');
  fs.writeFileSync(gitIgnorePath, '**/*\n');
  return dirPath;
}
const exportsDirs: string[] = ['tdesign-mobile-vue', 'vant', 'primevue'];

rimrafSync(ensureTempOutputDir(), {
  filter: (path, ent) => {
    return ent.isFile() && (ent as fs.Dirent).name !== '.gitignore';
  },
});

for (const entryPoint of exportsDirs) {
  const rsbuildInstance = await rslibBuild({
    _privateMeta: { configFilePath: '' }, // const rslibConfig = await loadConfig({ cwd: rootDir, });
    lib: [
      {
        format: 'esm',
        dts: { bundle: true },
        autoExtension: true,
        autoExternal: { devDependencies: true, peerDependencies: true },
        output: {
          sourceMap: {
            js: 'source-map',
          },
        },
      },
    ],
    source: {
      entry: {
        [`${entryPoint}/index`]: `./src/${entryPoint}/index.ts`,
      },
    },
    plugins: [
      pluginBabel({ include: /\.(?:jsx|tsx)$/ }),
      pluginVue(),
      pluginVueJsx({ vueJsxOptions: { transformOn: true } }),
    ],
  });

  const rsbuildOutputDir = rsbuildInstance.context.distPath;
  const tempOutputDir = path.join(ensureTempOutputDir(), entryPoint);
  console.log('rsbuildOutputDir :>> ', rsbuildOutputDir);
  console.log('tempOutputDir :>> ', tempOutputDir);
  await moveFiles(rsbuildOutputDir, tempOutputDir);
}

for (const entryPoint of exportsDirs) {
  await moveFiles(path.join(ensureTempOutputDir(), entryPoint), path.join(rootDir, 'dist', entryPoint));
}

await unbuild(rootDir, false, {
  entries: [
    'src/auto-imports/index.ts',
    'src/vite/index.ts',
    'src/vue-router/index.ts',
    'src/rollup/index.ts',
    'src/array/array-to-tree.ts',
  ],
  outDir: 'dist',
  clean: true,
  declaration: true,
  sourcemap: true,
  externals: ['vite', 'vue-router', 'nprogress', 'rollup', 'pinyin-pro'],
});

function moveFiles(sourceDir: string, targetDir: string): Promise<void> {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  return new Promise((resolve, reject) => {
    fs.readdir(sourceDir, (err, files) => {
      if (err) {
        reject(err);
        return;
      }

      for (const file of files) {
        const oldPath = path.join(sourceDir, file);
        const newPath = path.join(targetDir, file);
        const stat = fs.lstatSync(oldPath);

        if (stat.isDirectory()) {
          moveFiles(oldPath, targetDir)
            .then(() => {
              if (files.indexOf(file) === files.length - 1) {
                resolve();
              }
            })
            .catch((error_) => reject(error_));
        } else if (stat.isFile()) {
          fs.rename(oldPath, newPath, (err) => {
            if (err) {
              reject(err);
              return;
            }

            if (files.indexOf(file) === files.length - 1) {
              resolve();
            }
          });
        }
      }
    });
  });
}
