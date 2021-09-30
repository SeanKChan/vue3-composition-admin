import { onMounted, onUnmounted, ref } from 'vue'
import { BasicTarget, getTargetElement } from '../dom'

// 鼠标点击事件，click 不会监听右键
const defaultEvent = 'click'

type EventType = MouseEvent | TouchEvent;

function useClickAway(
  onClickAway: (event: EventType) => void,
  target: BasicTarget | BasicTarget[],
  eventName: string = defaultEvent
) {
  const onClickAwayRef = ref(onClickAway)

  const handler = (event: any) => {
    const targets = Array.isArray(target) ? target : [target]
    if (
      targets.some((targetItem) => {
        const targetElement = getTargetElement(targetItem) as HTMLElement
        return !targetElement || targetElement?.contains(event.target)
      })
    ) {
      return
    }
    onClickAwayRef.value(event)
  }

  onMounted(() => {
    document.addEventListener(eventName, handler)
  })

  onUnmounted(() => {
    document.removeEventListener(eventName, handler)
  })
}

export default useClickAway
