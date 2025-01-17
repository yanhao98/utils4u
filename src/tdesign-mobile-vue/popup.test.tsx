/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it } from 'vitest';
import { h } from 'vue';

import { openPopup } from '.';

describe('openPopup', () => {
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
});
