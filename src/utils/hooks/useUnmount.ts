import usePersistFn from './usePersistFn'
import { isFunction } from '@/utils'
import { onUnmounted } from 'vue'

const useUnmount = (fn: any) => {
  const fnPersist = usePersistFn(fn)

  onUnmounted(() => {
    if (isFunction(fnPersist)) {
      fnPersist()
    }
  })
}

export default useUnmount
