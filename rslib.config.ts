import { pluginBabel } from '@rsbuild/plugin-babel';
import { pluginVue } from '@rsbuild/plugin-vue';
import { pluginVueJsx } from '@rsbuild/plugin-vue-jsx';
import { defineConfig } from '@rslib/core';

export default defineConfig({
  lib: [
    {
      format: 'esm',
      dts: { bundle: true },
      autoExtension: true,
      autoExternal: { devDependencies: true, peerDependencies: true },
    },
  ],
  source: {
    entry: {
      'tdesign-mobile-vue/index': './src/tdesign-mobile-vue/index.ts',
      'vant/index': './src/vant/index.ts',
      'primevue/index': 'src/primevue/index.ts',
    },
  },
  plugins: [
    pluginBabel({
      include: /\.(?:jsx|tsx)$/,
    }),
    pluginVue(),
    pluginVueJsx({
      vueJsxOptions: {
        transformOn: true,
      },
    }),
  ],
});
