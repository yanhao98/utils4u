type ImportsMap = Record<string, (string | ImportNameAlias)[]>;
type ImportNameAlias = [string, string];
// type Deps = 'tdesign-mobile-vue' | 'vant';

export function createUtils4uAutoImports(/* deps: Deps[] */): ImportsMap {
  const imports: ImportsMap = {
    'deep-freeze-es6': [['default', 'deepFreeze']],
    // 待整理 https://github.com/unplugin/unplugin-auto-import/blob/627f60a114ea82995a2ce9814374c0bcc1e17904/src/presets/index.ts
    'utils4u/vue-use': ['useCountdown', 'useRefs'],
    'utils4u/vue-router': ['createLogGuard', 'createNProgressGuard', 'createStackGuard'],
    'utils4u/browser': ['setViewportCSSVars', 'showOpenFilePicker', 'convertFileToBase64'],
  };

  // if (deps.includes('tdesign-mobile-vue')) {
  //   imports['utils4u/tdesign-mobile-vue'] = [
  //     ['openPicker', 'utils4uTdesignMobileVueOpenPicker'],
  //     ['openPopup', 'utils4uTdesignMobileVueOpenPopup'],
  //     ['pickDate', 'utils4uTdesignMobileVuePickDate'],
  //   ];
  // }

  // if (deps.includes('vant')) {
  //   imports['utils4u/vant'] = [['confirmDialog', 'utils4uVantConfirmDialog']];
  // }

  return imports;
}
