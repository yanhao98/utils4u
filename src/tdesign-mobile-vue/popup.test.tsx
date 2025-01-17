/**
 * @vitest-environment happy-dom
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { h } from 'vue';

import { openPicker, openPopup, pickDate } from '.';

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
    const testId = Math.random().toString(36).substring(7);
    const content = h('div', { 'data-testid': testId }, '测试内容');
    openPopup(content);

    const element = document.querySelector(`[data-testid="${testId}"]`);
    expect(element).toBeTruthy();
  });

  it('关闭时应该从DOM中移除弹窗', async () => {
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

  it('应该使用默认值创建日期时间选择器弹窗', async () => {
    vi.useFakeTimers();
    const datePromise = pickDate({});
    await vi.advanceTimersByTimeAsync(300);

    const picker = document.querySelector('.t-date-time-picker');
    expect(picker).toBeTruthy();

    const title = document.querySelector('.t-picker__title');
    expect(title?.textContent).toBe('选择日期');

    // 模拟取消操作
    const cancelBtn = document.querySelector('.t-picker__cancel');
    cancelBtn?.dispatchEvent(new Event('click'));

    await expect(datePromise).rejects.toBe('cancel');
  });

  it('应该使用自定义选项创建日期时间选择器弹窗', async () => {
    const customOptions = {
      title: '自定义标题',
      format: 'YYYY-MM-DD',
      initValue: '2023-01-01',
      mode: 'date' as const,
      start: '2020-01-01',
      end: '2025-12-31',
    };

    const datePromise = pickDate(customOptions);

    const picker = document.querySelector('.t-date-time-picker');
    expect(picker).toBeTruthy();

    const title = document.querySelector('.t-picker__title');
    expect(title?.textContent).toBe('自定义标题');

    // 模拟确认操作
    const confirmBtn = document.querySelector('.t-picker__confirm');
    confirmBtn?.dispatchEvent(new Event('click'));

    await expect(datePromise).resolves.toBeDefined();
  });

  it('应该创建Picker弹窗并处理确认操作', async () => {
    const columns = [
      [
        { label: '选项1', value: '1' },
        { label: '选项2', value: '2' },
      ],
    ];
    const defaultValue = ['1'];
    const pickerPromise = openPicker({ columns, defaultValue });

    const picker = document.querySelector('.t-picker');
    expect(picker).toBeTruthy();

    const confirmBtn = document.querySelector('.t-picker__confirm');
    confirmBtn?.dispatchEvent(new Event('click'));

    await expect(pickerPromise).resolves.toBeDefined();
  });

  it('应该创建Picker弹窗并处理取消操作', async () => {
    const columns = [
      [
        { label: '选项1', value: '1' },
        { label: '选项2', value: '2' },
      ],
    ];
    const pickerPromise = openPicker({ columns });

    const picker = document.querySelector('.t-picker');
    expect(picker).toBeTruthy();

    const cancelBtn = document.querySelector('.t-picker__cancel');
    cancelBtn?.dispatchEvent(new Event('click'));

    await expect(pickerPromise).rejects.toBe('cancel');
  });

  it('应该使用动态列创建Picker弹窗', async () => {
    const columnsFunction = () => {
      return [
        [
          { label: '选项1', value: '1' },
          { label: '选项2', value: '2' },
        ],
      ];
    };

    const pickerPromise = openPicker({ columns: columnsFunction });

    const picker = document.querySelector('.t-picker');
    expect(picker).toBeTruthy();

    const confirmBtn = document.querySelector('.t-picker__confirm');
    confirmBtn?.dispatchEvent(new Event('click'));

    await expect(pickerPromise).resolves.toBeDefined();
  });
});
