import { onMounted, onUnmounted, reactive } from 'vue'
import usePersistFn from './usePersistFn'
import { BasicTarget, getTargetElement } from '../dom'

interface Position {
  left: number
  top: number
}

export type Target = BasicTarget<HTMLElement | Document>;
export type ScrollListenController = (val: Position) => boolean;

function useScroll(target?: Target, shouldUpdate: ScrollListenController = () => true): Position {
  const position = reactive<Position>({
    left: NaN,
    top: NaN
  })
  const setPosition = (val: Position) => {
    position.left = val.left
    position.top = val.top
  }

  const shouldUpdatePersist = usePersistFn(shouldUpdate)

  function updatePosition(currentTarget: Target): void {
    let newPosition
    if (currentTarget === document) {
      if (!document.scrollingElement) return
      newPosition = {
        left: document.scrollingElement.scrollLeft,
        top: document.scrollingElement.scrollTop
      }
    } else {
      newPosition = {
        left: (currentTarget as HTMLElement).scrollLeft,
        top: (currentTarget as HTMLElement).scrollTop
      }
    }
    if (shouldUpdatePersist(newPosition)) setPosition(newPosition)
  }

  function listener(event: Event): void {
    if (!event.target) return
    updatePosition(event.target as Target)
  }

  onMounted(() => {
    const el = getTargetElement(target, document)
    if (!el) return

    updatePosition(el as Target)
    el.addEventListener('scroll', listener)
  })

  onUnmounted(() => {
    const el = getTargetElement(target, document)
    if (!el) return
    el.removeEventListener('scroll', listener)
  })

  return position
}

export default useScroll
