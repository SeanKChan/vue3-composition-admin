import { onMounted, onUnmounted, ref } from 'vue'
// import 'intersection-observer';
import { BasicTarget, getTargetElement } from '../dom'

type InViewport = boolean | undefined;

function isInViewPort(el: HTMLElement): InViewport {
  if (!el) {
    return undefined
  }

  const viewPortWidth =
    window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  const viewPortHeight =
    window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  const rect = el.getBoundingClientRect()

  if (rect) {
    const { top, bottom, left, right } = rect
    return bottom > 0 && top <= viewPortHeight && left <= viewPortWidth && right > 0
  }

  return false
}

function useInViewport(target: BasicTarget): InViewport {
  const el = getTargetElement(target)
  const inViewPortValue = (isInViewPort(el as HTMLElement)) as unknown as InViewport
  const inViewPort = ref<InViewport>(inViewPortValue)

  const setInViewport = (val: any) => {
    inViewPort.value = val
  }

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        setInViewport(true)
      } else {
        setInViewport(false)
      }
    }
  })

  onMounted(() => {
    const el = getTargetElement(target)
    if (!el) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return () => {}
    }

    observer.observe(el as HTMLElement)
  })

  onUnmounted(() => {
    observer.disconnect()
  })

  return inViewPort as unknown as InViewport
}

export default useInViewport
