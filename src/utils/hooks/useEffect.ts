import { Ref, watch } from 'vue'

export function useEffect(fn: Function, args: Ref[]) {
  watch(args, () => {
    fn()
  }, {
    immediate: true
  })
}
