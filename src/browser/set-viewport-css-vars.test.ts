/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { setViewportCSSVars } from '.';

describe('setViewportCSSVars', () => {
  beforeEach(() => {
    // 每次测试前重置样式
    document.documentElement.style.removeProperty('--vh');
    document.documentElement.style.removeProperty('--vw');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('应该在初始化时设置视口 CSS 变量', () => {
    vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(1000);
    vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(500);

    setViewportCSSVars();

    expect(document.documentElement.style.getPropertyValue('--vh')).toBe('10px');
    expect(document.documentElement.style.getPropertyValue('--vw')).toBe('5px');
  });

  it('应该在窗口调整大小时更新视口 CSS 变量', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(1000);
    vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(500);

    setViewportCSSVars();

    expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));

    // 模拟调整窗口大小
    vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(800);
    vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(400);
    window.dispatchEvent(new Event('resize'));

    expect(document.documentElement.style.getPropertyValue('--vh')).toBe('8px');
    expect(document.documentElement.style.getPropertyValue('--vw')).toBe('4px');
  });
});
