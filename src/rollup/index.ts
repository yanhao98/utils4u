import path from 'node:path';
import type { OutputOptions } from 'rollup';
// import { pinyin } from 'pinyin-pro';

// packages/vite/src/node/plugins/splitVendorChunk.ts
export function createSplitChunkOutput(): OutputOptions {
  return {
    // chunkFileNames: 'assets/chunk/[name]_[hash].js',
    // entryFileNames: 'assets/entry/[name]_[hash].js',
    // assetFileNames: 'assets/[ext]/[name]_[hash].[ext]',
    manualChunks: (id /* , { getModuleIds, getModuleInfo } */) => {
      if (isInNodeModules(id) /* && !isCSSRequest(id) */) {
        let pkgName = id;
        pkgName = pkgName.split('.pnpm/')?.[1] || pkgName;
        pkgName = pkgName.split('node_modules/')?.[1] || pkgName;
        pkgName = pkgName.startsWith('@') ? pkgName.split('/')[0] + '/' + pkgName.split('/')[1] : pkgName.split('/')[0];

        if (pkgName.startsWith('@vue/') /* || pkgName === 'vue-demi' */) pkgName = 'vue';
        /* if (pkgName.includes('vue-router')) pkgName = 'vue-router'; */

        return `libs/${pkgName}`;
      } else if (id.includes('src/components')) {
        return formatFilename(id, 'components');
      } else if (id.includes('src/pages')) {
        return formatFilename(id, 'pages');
      }
    },
  };

  function formatFilename(id: string, prefix: string) {
    const filename = path
      .basename(id)
      .split('?')[0]
      .replace(/\.\w+$/, '');
    // filename = pinyin(filename, { type: 'array' }).join('');
    return `${prefix}/${filename}`;
  }

  function isInNodeModules(id: string): boolean {
    return id.includes('node_modules');
  }
  /* const CSS_LANGS_RE = /\.(css|less|sass|scss|styl|stylus|pcss|postcss|sss)(?:$|\?)/;
  const isCSSRequest = (request: string): boolean => CSS_LANGS_RE.test(request); */
}
