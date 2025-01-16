/**
 * @vitest-environment node
 */
import { describe, expect, it } from 'vitest';
import { createViteProxy } from './createViteProxy';
import path from 'node:path';
import fs from 'node:fs';

// vi.mock('vite', () => ({
//   loadEnv: vi.fn(),
// }));

describe('createViteProxy', () => {
  it('当传入undefined时应从环境变量加载配置', () => {
    // vi.mocked(loadEnv).mockReturnValue({ VITE_DEV_PROXY: '[["^/api", "http://example.com"]]' });
    fs.writeFileSync(
      path.resolve(process.cwd(), '.env.development.local'),
      `VITE_DEV_PROXY=[["^/api", "http://example.com"]]`,
    );

    const result = createViteProxy();
    fs.unlinkSync(path.resolve(process.cwd(), '.env.development.local'));

    expect(result).toEqual({
      '^/api': {
        target: 'http://example.com',
        changeOrigin: true,
        ws: true,
        rewrite: expect.any(Function),
      },
    });

    expect(createViteProxy()).toEqual({});
  });

  it('应正确处理字符串输入', () => {
    const proxyList = "[['/api', 'http://localhost:3000']]";
    const result = createViteProxy(proxyList);
    expect(result).toEqual({
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        ws: true,
        rewrite: expect.any(Function),
      },
    });
  });

  it('应正确处理数组输入', () => {
    const result = createViteProxy([['/api', 'http://example.com']]);
    expect(result['/api'].target).toBe('http://example.com');
  });

  it('应正确处理https目标', () => {
    const result = createViteProxy([['/api', 'https://example.com']]);
    expect(result['/api'].secure).toBe(false);
  });

  it('应正确处理无效的JSON字符串', () => {
    const result = createViteProxy('invalid json');
    expect(result).toEqual({});
  });
});
