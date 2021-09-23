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
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const targetElement = getTargetElement(options.target, window)!
  const handlerRef = ref(handler)
  if (!targetElement.addEventListener) {
    return
  }

  const eventListener = (
    event: Event
  ): EventListenerOrEventListenerObject | AddEventListenerOptions => {
    return handlerRef.value(event)
  }

  onMounted(() => {
    targetElement.addEventListener(eventName, eventListener, {
      capture: options.capture,
      once: options.once,
      passive: options.passive
    })
  })

  onUnmounted(() => {
    targetElement.removeEventListener(eventName, eventListener, {
      capture: options.capture
    })
  })
}

export default useEventListener
