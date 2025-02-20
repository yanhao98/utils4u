/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi } from 'vitest';
import { getCurrentInstance } from 'vue';

import { useRefs } from '.';

vi.mock('vue', () => ({
  getCurrentInstance: vi.fn(),
  reactive: vi.fn((obj) => obj),
}));

describe('useRefs', () => {
  it('当在 setup 外调用时应该发出警告', () => {
    const consoleSpy = vi.spyOn(console, 'warn');
    consoleSpy.mockImplementation((...args) => {
      if (process.env.TERM_PROGRAM !== 'vscode') return;
      console.warn(...args);
    });
    vi.mocked(getCurrentInstance).mockReturnValue(null);

    useRefs();

    expect(consoleSpy).toHaveBeenCalledWith('useRefs() must be called within the setup() function');
  });

  it('应该返回 refs 对象和 toRef 函数', () => {
    vi.mocked(getCurrentInstance).mockReturnValue({} as any);

    type Refs = {
      foo: HTMLElement;
    };

    const { refs, toRef } = useRefs<Refs>();

    expect(refs).toBeDefined();
    expect(toRef).toBeInstanceOf(Function);
  });

  it('toRef 应该将元素设置到 refs 对象中', () => {
    vi.mocked(getCurrentInstance).mockReturnValue({} as any);

    type Refs = {
      foo: HTMLElement;
    };

    const { refs, toRef } = useRefs<Refs>();
    const element = document.createElement('div');

    toRef('foo')(element);

    expect(refs.foo).toBe(element);
  });
});
