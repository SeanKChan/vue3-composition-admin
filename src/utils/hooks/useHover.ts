import { onMounted, onUnmounted, ref } from 'vue'
import { BasicTarget, getTargetElement } from '../dom'

export interface Options {
  onEnter?: () => void
  onLeave?: () => void
}

function useHover(target: BasicTarget, options?: Options) {
  const { onEnter, onLeave } = options || {}
  const state = ref(false)
  const setTrue = () => { state.value = true }
  const setFalse = () => { state.value = false }
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
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const targetElement = getTargetElement(target, window)!
    if (!targetElement.addEventListener) {
      return
    }
    targetElement.addEventListener(
      'mouseenter',
      () => {
        onEnter && onEnter()
        setTrue()
      }
    )
    targetElement.addEventListener(
      'mouseleave',
      () => {
        onLeave && onLeave()
        setFalse()
      }
    )
  })

  onUnmounted(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const targetElement = getTargetElement(target, window)!
    if (!targetElement.removeEventListener) {
      return
    }
    targetElement.removeEventListener(
      'mouseenter',
      () => {
        onEnter && onEnter()
        setTrue()
      }
    )
    targetElement.removeEventListener(
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
