/**
 * @vitest-environment happy-dom
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { h } from 'vue';

import { openPopup } from '.';

describe('openPopup', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });
  afterEach(() => {
    vi.useFakeTimers();
  });

  it('应该创建弹窗并返回包含关闭方法的API', () => {
    const content = h('div', '测试内容');
    const popup = openPopup(content);

    expect(popup).toHaveProperty('close');
    expect(typeof popup.close).toBe('function');
  });

  it('应该使用提供的内容创建弹窗', () => {
    const testId = 'test-content';
    const content = h('div', { 'data-testid': testId }, '测试内容');
    openPopup(content);

    const element = document.querySelector(`[data-testid="${testId}"]`);
    expect(element).toBeTruthy();
  });

  it('should remove popup from DOM when closed', async () => {
    vi.useFakeTimers();
    const testId = Math.random().toString(36).substring(7);
    const content = h('div', { 'data-testid': testId }, '测试内容-111');
    const popup = openPopup(content);

    expect(document.body.querySelector(`[data-testid="${testId}"]`)).toBeTruthy();

    await vi.advanceTimersByTimeAsync(500);
    popup.close();

    await vi.advanceTimersByTimeAsync(300);
    expect(document.body.querySelector(`[data-testid="${testId}"]`)).toBeFalsy();
  });
});
