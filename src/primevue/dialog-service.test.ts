import { beforeEach, describe, expect, it, vi } from 'vitest';
// @ts-expect-error - Ignore missing types
import DynamicDialogEventBus from 'primevue/dynamicdialogeventbus';
import { markRaw } from 'vue';

import { DialogService } from '.';

vi.mock('primevue/dynamicdialogeventbus', () => ({
  default: {
    emit: vi.fn(),
  },
}));

describe('DialogService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('open', () => {
    it('应该返回包含内容和选项的正确实例', () => {
      const content = { template: '<div>Test</div>' };
      const options = { data: { foo: 'bar' } };

      const instance = DialogService.open(content, options);

      expect(instance).toEqual({
        content: markRaw(content),
        options,
        data: options.data,
        close: expect.any(Function),
      });
    });

    it('当仅提供内容时应返回带有默认值的实例', () => {
      const content = { template: '<div>Test</div>' };

      const instance = DialogService.open(content);

      expect(instance).toEqual({
        content: markRaw(content),
        options: {},
        data: undefined,
        close: expect.any(Function),
      });
    });

    it('应该发出带有实例的open事件', () => {
      const content = { template: '<div>Test</div>' };
      const instance = DialogService.open(content);

      expect(DynamicDialogEventBus.emit).toHaveBeenCalledWith('open', { instance });
    });

    it('应该正确处理空内容', () => {
      const instance = DialogService.open(null);

      expect(instance).toEqual({
        content: null,
        options: {},
        data: undefined,
        close: expect.any(Function),
      });
    });

    describe('instance.close', () => {
      it('应该发出带有参数的close事件', () => {
        const content = { template: '<div>Test</div>' };
        const instance = DialogService.open(content);
        const params = { result: 'success' };

        instance.close(params);

        expect(DynamicDialogEventBus.emit).toHaveBeenCalledWith('close', {
          instance,
          params,
        });
      });
    });
  });
});
