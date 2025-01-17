/**
 * @vitest-environment happy-dom
 */

// @ts-expect-error - 忽略缺失的类型
import ConfirmationEventBus from 'primevue/confirmationeventbus';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ConfirmationService, type HConfirmationOptions } from '.';

// 模拟 ConfirmationEventBus
vi.mock('primevue/confirmationeventbus', () => ({
  default: {
    emit: vi.fn(),
  },
}));

describe('ConfirmationService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('当调用 require 时应使用选项发出确认事件', async () => {
    const options: HConfirmationOptions = {
      message: '你确定吗？',
      header: '确认',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {},
      reject: () => {},
    };

    ConfirmationService.require(options);
    // await new Promise((resolve) => setTimeout(resolve, 0));

    expect(ConfirmationEventBus.emit).toHaveBeenCalledWith('confirm', options);
  });

  it('应该在调用 require 时处理最小选项', () => {
    const minimalOptions: HConfirmationOptions = {
      message: '测试消息',
    };

    ConfirmationService.require(minimalOptions);

    expect(ConfirmationEventBus.emit).toHaveBeenCalledWith('confirm', minimalOptions);
  });

  it('调用 close 时应发出关闭事件', () => {
    ConfirmationService.close();

    expect(ConfirmationEventBus.emit).toHaveBeenCalledWith('close');
  });

  it('关闭事件不应传递任何参数', () => {
    ConfirmationService.close();

    expect(ConfirmationEventBus.emit).toHaveBeenCalledTimes(1);
    expect(ConfirmationEventBus.emit).toHaveBeenCalledWith('close');
    expect(ConfirmationEventBus.emit.mock.calls[0]).toHaveLength(1);
  });

  it('调用 require 时应保留所有选项', () => {
    const fullOptions: HConfirmationOptions = {
      message: '完整测试',
      header: '测试标题',
      icon: 'test-icon',
      accept: () => {},
      reject: () => {},
      acceptProps: { label: '确定' },
      rejectProps: { label: '取消' },
    };

    ConfirmationService.require(fullOptions);

    expect(ConfirmationEventBus.emit).toHaveBeenCalledWith('confirm', fullOptions);
  });
});
