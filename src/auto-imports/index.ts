type ImportsMap = Record<string, (string | ImportNameAlias)[]>;
type ImportNameAlias = [string, string];

export const Utils4uAutoImports: ImportsMap = {
  'utils4u/vue-use': [
    ['useCountdown', 'utils4uVueUseCountdown'],
    ['useRefs', 'utils4uVueUseRefs'],
  ],
  'utils4u/vue-router': [
    ['createLogGuard', 'utils4uVueRouterCreateLogGuard'],
    ['createProgressGuard', 'utils4uVueRouterCreateProgressGuard'],
    ['createStackGuard', 'utils4uVueRouterCreateStackGuard'],
  ],
  'utils4u/vite': [['createViteProxy', 'utils4uViteCreateViteProxy']],
  'utils4u/vant': [['confirmDialog', 'utils4uVantConfirmDialog']],
  'utils4u/tdesign-mobile-vue': [
    ['openPicker', 'utils4uTdesignMobileVueOpenPicker'],
    ['openPopup', 'utils4uTdesignMobileVueOpenPopup'],
    ['pickDate', 'utils4uTdesignMobileVuePickDate'],
  ],
  'utils4u/browser': [
    ['browserViewportCompat', 'utils4uBrowserViewportCompat'],
    ['chooseFile', 'utils4uBrowserChooseFile'],
    ['toBase64', 'utils4uBrowserToBase64'],
  ],
};
