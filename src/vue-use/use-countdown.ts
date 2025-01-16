import { useIntervalFn } from '@vueuse/core';
import { ref } from 'vue';

/**
 * 一个提供倒计时功能的组合式函数。
 *
 * @param duration - 倒计时的初始时长（毫秒）
 * @param interval - 倒计时的时间间隔（毫秒，默认值：1000）
 *
 * @returns 返回一个对象，包含：
 * - countdownTime: Ref<number> - 当前倒计时的时间
 * - triggerCountdown: () => void - 开始/重新开始倒计时的函数
 * - isCounting: Ref<boolean> - 当前是否正在倒计时
 *
 * @example
 * ```ts
 * const { countdownTime, triggerCountdown, isCounting } = useCountdown(5000);
 * triggerCountdown(); // 开始一个5秒的倒计时
 * ```
 */
export function useCountdown(duration: number, interval: number = 1000) {
  const countdownTime = ref(duration);
  const {
    pause,
    resume,
    isActive: isCounting,
  } = useIntervalFn(
    () => {
      if (--countdownTime.value <= 0) {
        pause();
      }
    },
    interval,
    {
      immediate: false,
    },
  );

  function triggerCountdown() {
    countdownTime.value = duration;
    resume();
  }

  return {
    countdownTime: countdownTime,
    triggerCountdown,
    isCounting,
  };
}
