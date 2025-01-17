/**
 * @vitest-environment happy-dom
 */
import { flushPromises } from '@vue/test-utils';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { confirmDialog } from '.';

describe('confirmDialog', () => {
  let container: HTMLDivElement;
  let onConfirmSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    container = document.createElement('div');
    onConfirmSpy = vi.fn();
  });

  it('应该正确渲染对话框内容并处理确认操作', async () => {
    const dialogMessage = '测试消息';
    const dialogTitle = '测试标题';

    confirmDialog({
      title: dialogTitle,
      message: dialogMessage,
      onConfirm: onConfirmSpy,
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
    const onCancelSpy = vi.fn();

    confirmDialog({
      title: '测试标题',
      message: '测试消息',
      teleport: container,
    }).catch(onCancelSpy);
    await flushPromises();

    const dialog = container.querySelector('.van-dialog');
    const cancelButton = container.querySelector('.van-dialog__cancel');

    cancelButton?.dispatchEvent(new Event('click'));
    await flushPromises();

    expect(onCancelSpy).toHaveBeenCalledWith('cancel');
    expect(dialog?.className).toContain('van-dialog-bounce-leave-active');
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
