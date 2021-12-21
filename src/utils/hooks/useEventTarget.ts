import { ref } from 'vue'

interface EventTarget<U> {
  target: {
    value: U
  }
}

export interface Options<T, U> {
  initialValue?: T
  transformer?: (value: U) => T
}

function useEventTarget<T, U = T>(options?: Options<T, U>) {
  const { initialValue, transformer } = options || {}
  const value = ref(initialValue)
  const setValue = (val: any) => {
    value.value = val
  }

  const reset = () => setValue(initialValue)

  const transformerRef = ref(transformer)

  const onChange = (e: EventTarget<U>) => {
    const _value = e.target.value
    if (typeof transformerRef.value === 'function') {
      return setValue(transformerRef.value(_value))
    }
    // no transformer => U and T should be the same
    return setValue((_value as unknown) as T)
  }

  return {
    value,
    onChange,
    reset
  }
}

export default useEventTarget
