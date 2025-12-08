/**
 * @vitest-environment happy-dom
 */
import { flushPromises } from '@vue/test-utils';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';

import { confirmDialog } from '.';

describe('confirmDialog', () => {
  let container: HTMLDivElement;
  let onConfirmSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    container = document.createElement('div');
    onConfirmSpy = vi.fn();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('应该正确渲染对话框内容并处理确认操作', async () => {
    const dialogMessage = '测试消息';
    const dialogTitle = '测试标题';

    confirmDialog({
      title: dialogTitle,
      message: dialogMessage,
      onConfirm: onConfirmSpy as () => Promise<unknown>,
      teleport: container,
    });
    await flushPromises();

    const dialog = container.querySelector('.van-dialog');
    expect(dialog).toBeTruthy();
    expect(dialog?.textContent).toContain(dialogTitle);
    expect(dialog?.textContent).toContain(dialogMessage);

    const confirmButton = container.querySelector('.van-dialog__confirm');
    confirmButton?.dispatchEvent(new Event('click'));
    await flushPromises();

    expect(onConfirmSpy).toHaveBeenCalledTimes(1);
  });

  it('当确认回调失败时不应关闭对话框', async () => {
    const errorMessage = '操作失败';
    const failingConfirm = vi.fn().mockRejectedValueOnce(new Error(errorMessage));

    confirmDialog({
      title: '测试标题',
      message: '测试消息',
      onConfirm: failingConfirm,
      teleport: container,
    });
    await flushPromises();

    const dialog = container.querySelector('.van-dialog');
    const confirmButton = container.querySelector('.van-dialog__confirm');

    confirmButton?.dispatchEvent(new Event('click'));
    await flushPromises();

    expect(failingConfirm).toHaveBeenCalledTimes(1);
    expect(dialog).toBeTruthy();
  });

  it('点击取消按钮时应该关闭对话框', async () => {
    vi.useFakeTimers();
    const onCancelSpy = vi.fn();

    confirmDialog({ teleport: container }).catch(onCancelSpy);
    await flushPromises();

    const dialog = container.querySelector('.van-dialog') as HTMLDivElement;
    const cancelButton = container.querySelector('.van-dialog__cancel');

    cancelButton?.dispatchEvent(new Event('click'));
    await vi.advanceTimersByTimeAsync(0);

    expect(onCancelSpy).toHaveBeenCalledWith('cancel');
    // https://github.com/youzan/vant/blob/1f806539d9591de84cf67d20e21a7ccff3e0c885/packages/vant/src/dialog/test/function-call.spec.tsx#L57
    expect(dialog?.className).toContain('van-dialog-bounce-leave-active');

    // https://stackoverflow.com/questions/71996356/how-to-test-transition-function-in-vue-3-test-utils
    vi.advanceTimersByTime(300);
    expect(dialog?.style.display).toBe('none');
  });

  it('应该处理空标题和消息的情况', async () => {
    confirmDialog({
      title: '',
      message: '',
      teleport: container,
    });
    await flushPromises();

    const dialog = container.querySelector('.van-dialog');
    expect(dialog).toBeTruthy();
  });
});
