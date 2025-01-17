/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect, vi } from 'vitest';

import { showOpenFilePicker } from '.';

describe('showOpenFilePicker', () => {
  it('应该创建具有正确属性的input元素', async () => {
    const createElementSpy = vi.spyOn(document, 'createElement');
    const clickSpy = vi.spyOn(HTMLInputElement.prototype, 'click');

    const promise = showOpenFilePicker({
      accept: '.jpg,.png',
      multiple: true,
    });

    expect(createElementSpy).toHaveBeenCalledWith('input');
    const input = createElementSpy.mock.results[0].value as HTMLInputElement;

    expect(input.type).toBe('file');
    expect(input.accept).toBe('.jpg,.png');
    expect(input.multiple).toBe(true);
    expect(clickSpy).toHaveBeenCalled();

    // 模拟文件选择
    const mockFiles = {
      length: 1,
      item: () => new File([], 'test.jpg'),
    } as any;
    input.files = mockFiles;
    input.dispatchEvent(new Event('change'));

    const result = await promise;
    expect(result).toBe(mockFiles);
  });

  it('当用户取消时应该拒绝', async () => {
    const input = document.createElement('input');
    vi.spyOn(document, 'createElement').mockReturnValue(input);

    const promise = showOpenFilePicker({});
    input.dispatchEvent(new Event('cancel'));

    await expect(promise).rejects.toBe('User cancel');
  });

  it('未提供选项时应使用默认选项', () => {
    const createElementSpy = vi.spyOn(document, 'createElement');

    showOpenFilePicker({});

    const input = createElementSpy.mock.results[0].value as HTMLInputElement;
    expect(input.accept).toBe('');
    expect(input.multiple).toBe(false);
  });
});
