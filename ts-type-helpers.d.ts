/**
 * It's the same as Record<string, any>
 */
type Recordable<T = any> = {
  [key: string]: T;
};

type Nullable<T> = T | null;
