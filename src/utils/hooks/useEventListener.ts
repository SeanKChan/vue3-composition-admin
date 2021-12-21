import { onMounted, onUnmounted, ref } from 'vue'
import { BasicTarget, getTargetElement } from '../dom'

export type Target = BasicTarget<HTMLElement | Element | Window | Document>;

type Options<T extends Target = Target> = {
  target?: T
  capture?: boolean
  once?: boolean
  passive?: boolean
}

function useEventListener(eventName: string, handler: Function, options: Options = {
  capture: false,
  once: false,
  passive: false
}) {
  const handlerRef = ref(handler)

  const eventListener = (
    event: Event
  ): EventListenerOrEventListenerObject | AddEventListenerOptions => {
    return handlerRef.value(event)
  }

  onMounted(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const targetElement = getTargetElement(options.target, window)!
    if (!targetElement.addEventListener) {
      return
    }
    targetElement.addEventListener(eventName, eventListener, {
      capture: options.capture,
      once: options.once,
      passive: options.passive
    })
  })

  onUnmounted(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const targetElement = getTargetElement(options.target, window)!
    if (!targetElement.removeEventListener) {
      return
    }
    targetElement.removeEventListener(eventName, eventListener, {
      capture: options.capture
    })
  })
}

export default useEventListener
