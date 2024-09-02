import { type DialogOptions, showConfirmDialog } from 'vant';

type ConfirmDialogOptions = Omit<DialogOptions, 'beforeClose'> & {
  onConfirm?: () => Promise<unknown>;
};

const confirmDialogDefaultOptions: ConfirmDialogOptions = {
  title: '提示',
};

/**
 * 支持传入异步任务，点击确认时执行异步任务（onConfirm），如果异步任务失败则不关闭对话框。
 *
 */
export function confirmDialog(options: ConfirmDialogOptions) {
  const { onConfirm, ...dialogOptions } = {
    ...confirmDialogDefaultOptions,
    ...options,
  };

  return showConfirmDialog({
    ...dialogOptions,
    async beforeClose(action) {
      if (action === 'confirm' && onConfirm) {
        try {
          await onConfirm();
          return true;
        } catch {
          return false;
        }
      }
      return true;
    },
  });
}
