import { ref } from 'vue'

export type noop = (...args: any[]) => any;

function usePersistFn<T extends noop>(fn: T) {
  const fnRef = ref<T>(fn)

  const persistFn = ref<T>()
  if (!persistFn.value) {
    persistFn.value = ((...args) => fnRef.value(args)) as T
  }
  // @typescript-eslint/no-non-null-assertion
  return persistFn.value
}

export default usePersistFn
