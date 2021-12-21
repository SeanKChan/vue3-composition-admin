import { ref } from 'vue'
import useEventListener from './useEventListener'

export interface CursorState {
  screenX: number
  screenY: number
  clientX: number
  clientY: number
  pageX: number
  pageY: number
}

const initState: CursorState = {
  screenX: NaN,
  screenY: NaN,
  clientX: NaN,
  clientY: NaN,
  pageX: NaN,
  pageY: NaN
}

function useMouse() {
  const state = ref(initState)
  const setState = (val: any) => {
    state.value = val
  }

  useEventListener(
    'mousemove',
    (event: MouseEvent) => {
      const { screenX, screenY, clientX, clientY, pageX, pageY } = event
      setState({ screenX, screenY, clientX, clientY, pageX, pageY })
    },
    {
      target: document
    }
  )

  return state
}
export default useMouse
