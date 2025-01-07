// ========================================================================
// ============================= ToastService =============================
// ========================================================================
// @ts-expect-error - Ignore missing types
import ToastEventBus from 'primevue/toasteventbus';

import type { ToastServiceMethods } from 'primevue/toastservice';
// https://github.com/primefaces/primevue/blob/61929eae7526015af0362fc5889f2af7527403d1/packages/primevue/src/toastservice/ToastService.js
export const ToastService: ToastServiceMethods = {
  add: (message) => {
    ToastEventBus.emit('add', message);
  },
  remove: (message) => {
    ToastEventBus.emit('remove', message);
  },
  removeGroup: (group) => {
    ToastEventBus.emit('remove-group', group);
  },
  removeAllGroups: () => {
    ToastEventBus.emit('remove-all-groups');
  },
};
