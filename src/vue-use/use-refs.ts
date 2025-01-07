// https://gist.github.com/iamsonnn/dbf6d8407a0959f7dc66f6d24231799c

import { getCurrentInstance, reactive } from 'vue';

export const useRefs = <T extends object>() => {
  const instance = getCurrentInstance();
  if (!instance) console.warn('useRefs() must be called within the setup() function');

  const refs = reactive<T>({} as T);
  const toRef = (refName: keyof T) => (el: any) => ((refs as T)[refName as keyof T] = el);
  return {
    refs,
    toRef,
  };
};
