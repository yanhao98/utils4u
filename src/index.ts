/**
 * Recursively freeze an object effectively disallowing
 * changing/adding/editing of its properties.
 * @param {Record<string, unknown>} obj The object to deep freeze
 */
export const deepFreeze = <T extends Record<string, unknown>>(obj: T): T => {
  // https://github.com/christophehurpeau/deep-freeze-es6/blob/main/lib/index.js
  const propNames: string[] = Object.getOwnPropertyNames(obj);

  for (const name of propNames) {
    const value = obj[name] as T;

    if (value && typeof value === 'object') {
      deepFreeze(value);
    }
  }

  return Object.freeze(obj);
};

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
