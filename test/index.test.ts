import { describe, expect, it } from 'vitest';
import { test } from '../src';

describe('utils4u', () => {
  it.todo('pass', () => {
    expect(true).toBe(true);
  });
  it('test', () => {
    expect(test()).toBe('works!');
  });
});
