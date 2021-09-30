import { ref, onMounted } from 'vue'
// import useEventListener from './useEventListener'
import { BasicTarget } from '../dom'

export interface Options {
  onEnter?: () => void
  onLeave?: () => void
}

function useHover(target: BasicTarget, options?: Options) {
  const { onEnter, onLeave } = options || {}
  const state = ref(false)
  const setTrue = () => { state.value = true }
  const setFalse = () => { state.value = false }
  console.log(state.value + 'state')

  // useEventListener(
  //   'mouseEnter',
  //   () => {
  //     onEnter && onEnter()
  //     setTrue()
  //   },
  //   {
  //     target
  //   }
  // )
  //
  // useEventListener(
  //   'mouseLeave',
  //   () => {
  //     onLeave && onLeave()
  //     setFalse()
  //   },
  //   {
  //     target
  //   }
  // )
  onMounted(() => {
    document.addEventListener(
      'mouseenter',
      () => {
        onEnter && onEnter()
        setTrue()
      }
    )
    document.addEventListener(
      'mouseleave',
      () => {
        onLeave && onLeave()
        setFalse()
      }
    )
  })
  return state
}
export default useHover
