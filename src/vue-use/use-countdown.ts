import { useIntervalFn } from '@vueuse/core';
import { ref } from 'vue';

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
    }
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
