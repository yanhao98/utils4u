// ========================================================================
// ============================= DialogService ============================
// ========================================================================
// @ts-expect-error - Ignore missing types
import DynamicDialogEventBus from 'primevue/dynamicdialogeventbus';

import type { DialogServiceMethods } from 'primevue/dialogservice';
import { inject, markRaw, type ComputedRef } from 'vue';

// https://github.com/primefaces/primevue/blob/18367429f624285ff32d0ef775c1825a43a02fb1/packages/primevue/src/dialogservice/DialogService.js#L7
export const DialogService: DialogServiceMethods = {
  open: (content, options) => {
    const instance = {
      content: content && markRaw(content),
      options: options || {},
      data: options && options.data,
      close: (params: unknown) => {
        DynamicDialogEventBus.emit('close', { instance, params });
      },
    };

    DynamicDialogEventBus.emit('open', { instance });

    return instance;
  },
};

export function usePrimevueDialogRef() {
  type DialogRef = ComputedRef<import('primevue/dynamicdialogoptions').DynamicDialogInstance>;
  return inject<DialogRef>('dialogRef');
}
