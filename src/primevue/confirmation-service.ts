// ========================================================================
// ========================== ConfirmationService =========================
// ========================================================================
// @ts-expect-error - Ignore missing types
import ConfirmationEventBus from 'primevue/confirmationeventbus';

import type { ConfirmationOptions } from 'primevue/confirmationoptions';
interface HConfirmationOptions extends ConfirmationOptions {
  rejectProps?: import('primevue/button').ButtonProps;
  acceptProps?: import('primevue/button').ButtonProps;
}
export const ConfirmationService = {
  require: (options: HConfirmationOptions) => {
    ConfirmationEventBus.emit('confirm', options);
  },
  close: () => {
    ConfirmationEventBus.emit('close');
  },
};
