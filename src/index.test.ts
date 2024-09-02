import { describe, expect, it } from 'vitest';
import { deepFreeze } from '.';

describe('utils4u', () => {
  it('deepFreeze', () => {
    const obj = {
      a: 1,
      b: {
        c: 2,
        d: {
          e: 3,
        },
      },
    };
    const frozenObj = deepFreeze(obj);
    expect(() => {
      frozenObj.a = 2;
    }).toThrow();
  });
});
