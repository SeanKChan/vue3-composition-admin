import { ref, watch } from 'vue'
import useUnmount from './useUnmount'

export interface Options {
  restoreOnUnmount?: boolean
}

const DEFAULT_OPTIONS: Options = {
  restoreOnUnmount: false
}

function useTitle(title: string, options: Options = DEFAULT_OPTIONS) {
  const titleRef = ref(document.title)
  const titleValue = ref(title)
  watch(titleValue, (titleValue) => {
    document.title = titleValue
  }, { deep: true, immediate: true })

  // onUnmounted(() => {
  //   if (options && options.restoreOnUnmount) {
  //     document.title = titleRef.value
  //   }
  // })

  useUnmount(() => {
    if (options && options.restoreOnUnmount) {
      document.title = titleRef.value
    }
  })
}
// eslint-disable-next-line @typescript-eslint/no-empty-function
const emptyFun = () => {}
export default typeof document !== 'undefined' ? useTitle : emptyFun
