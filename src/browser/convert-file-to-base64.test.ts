/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect, vi } from 'vitest';

import { convertFileToBase64 } from '.';

describe('convertFileToBase64', () => {
  it('应该将文件转换为base64字符串', async () => {
    const mockFile = new File(['test'], 'test.txt', { type: 'text/plain' });
    const expectedBase64 = 'data:text/plain;base64,dGVzdA==';

    const result = await convertFileToBase64(mockFile);
    expect(result).toBe(expectedBase64);

    // 把base64转换回文件内容
    expect(atob(result.split(',')[1])).toBe('test');
  });

  it('当FileReader发生错误时应该拒绝Promise', async () => {
    const mockFile = new File(['test'], 'test.txt');
    const mockError = new Error('FileReader错误');

    // 模拟FileReader以模拟错误
    const mockFileReader = {
      readAsDataURL: vi.fn(),
      addEventListener: vi.fn((event, cb) => {
        if (event === 'error') cb(mockError);
      }),
    };

    vi.spyOn(window, 'FileReader').mockImplementation(() => mockFileReader as any);

    await expect(convertFileToBase64(mockFile)).rejects.toEqual(mockError);
  });
});
