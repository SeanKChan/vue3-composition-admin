import ResizeObserver from 'resize-observer-polyfill'
import { onBeforeMount, onUnmounted, reactive } from 'vue'
import { BasicTarget, getTargetElement } from '../dom'

type Size = { width?: number, height?: number };

function useSize(target: BasicTarget): Size {
  const el = getTargetElement(target)
  const stateDefault = {
    width: ((el || {}) as HTMLElement).clientWidth,
    height: ((el || {}) as HTMLElement).clientHeight
  }
  const state = reactive<Size>(stateDefault)
  const setState = (val: Size) => {
    state.width = val.width
    state.height = val.height
  }

  const resizeObserver = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      setState({
        width: entry.target.clientWidth,
        height: entry.target.clientHeight
      })
    })
  })

  onBeforeMount(() => {
    const el = getTargetElement(target)
    if (!el) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return () => {}
    }
    resizeObserver.observe(el as HTMLElement)
  })

  onUnmounted(() => {
    resizeObserver.disconnect()
  })

  return state
}
export default useSize
