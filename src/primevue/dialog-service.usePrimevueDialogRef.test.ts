import { describe, it, expect, vi } from 'vitest';
import { inject } from 'vue';

import { usePrimevueDialogRef } from '.';

vi.mock('vue', () => ({
  inject: vi.fn(),
}));

describe('usePrimevueDialogRef', () => {
  it('应该使用dialogRef作为key调用inject', () => {
    usePrimevueDialogRef();
    expect(inject).toHaveBeenCalledWith('dialogRef');
  });

  it('应该返回注入的dialog引用', () => {
    const mockDialogRef = { value: { visible: true } };
    vi.mocked(inject).mockReturnValue(mockDialogRef);

    const result = usePrimevueDialogRef();
    expect(result).toBe(mockDialogRef);
  });
});
