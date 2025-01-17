import { beforeEach, describe, expect, it, vi } from 'vitest';
// @ts-expect-error - Ignore missing types
import ToastEventBus from 'primevue/toasteventbus';
import type { ToastMessageOptions } from 'primevue/toast';

import { ToastService } from '.';

// Mock ToastEventBus
vi.mock('primevue/toasteventbus', () => ({
  default: {
    emit: vi.fn(),
  },
}));

describe('ToastService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('应该正确触发消息添加事件', () => {
    const message: ToastMessageOptions = { severity: 'info', summary: '测试' };
    ToastService.add(message);
    expect(ToastEventBus.emit).toHaveBeenCalledWith('add', message);
  });

  it('应该正确触发消息删除事件', () => {
    const message: ToastMessageOptions = { severity: 'info', summary: '测试' };
    ToastService.remove(message);
    expect(ToastEventBus.emit).toHaveBeenCalledWith('remove', message);
  });

  it('应该正确触发删除分组事件', () => {
    const group = 'test-group';
    ToastService.removeGroup(group);
    expect(ToastEventBus.emit).toHaveBeenCalledWith('remove-group', group);
  });

  it('应该正确触发删除所有分组事件', () => {
    ToastService.removeAllGroups();
    expect(ToastEventBus.emit).toHaveBeenCalledWith('remove-all-groups');
  });
});
