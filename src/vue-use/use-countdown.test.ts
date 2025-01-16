import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useCountdown } from './use-countdown';

describe('useCountdown', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('应该使用给定的时长初始化', () => {
    const { countdownTime } = useCountdown(10);
    expect(countdownTime.value).toBe(10);
  });

  it('触发后应该开始倒计时', () => {
    const { countdownTime, triggerCountdown } = useCountdown(3);

    triggerCountdown();
    expect(countdownTime.value).toBe(3);

    vi.advanceTimersByTime(1000);
    expect(countdownTime.value).toBe(2);

    vi.advanceTimersByTime(1000);
    expect(countdownTime.value).toBe(1);

    vi.advanceTimersByTime(1000);
    expect(countdownTime.value).toBe(0);
  });

  it('倒计时到零时应该停止', () => {
    const { countdownTime, triggerCountdown, isCounting } = useCountdown(2);

    triggerCountdown();
    expect(isCounting.value).toBe(true);

    vi.advanceTimersByTime(2000);
    expect(countdownTime.value).toBe(0);
    expect(isCounting.value).toBe(false);
  });

  it('应该遵循自定义的时间间隔', () => {
    const { countdownTime, triggerCountdown } = useCountdown(2, 500);

    triggerCountdown();
    vi.advanceTimersByTime(500);
    expect(countdownTime.value).toBe(1);
  });

  it('再次触发时应该重置时长', () => {
    const { countdownTime, triggerCountdown } = useCountdown(2);

    triggerCountdown();
    vi.advanceTimersByTime(1000);
    expect(countdownTime.value).toBe(1);

    triggerCountdown();
    expect(countdownTime.value).toBe(2);
  });
});
