import { reactive, onMounted, onUnmounted } from 'vue'
import { BasicTarget, getTargetElement } from '../dom'

interface IRect {
  top: number
  left: number
  bottom: number
  right: number
  height: number
  width: number
}
export interface IState extends IRect {
  text: string
}

const initRect: IRect = {
  top: NaN,
  left: NaN,
  bottom: NaN,
  right: NaN,
  height: NaN,
  width: NaN
}

const initState: IState = {
  text: '',
  ...initRect
}

function getRectFromSelection(selection: Selection | null): IRect {
  if (!selection) {
    return initRect
  }

  if (selection.rangeCount < 1) {
    return initRect
  }
  const range = selection.getRangeAt(0)
  const { height, width, top, left, right, bottom } = range.getBoundingClientRect()
  return {
    height,
    width,
    top,
    left,
    right,
    bottom
  }
}

/**
 * 获取用户选取的文本或当前光标插入的位置
 * */
export default function useTextSelection(target?: BasicTarget) {
  const state = reactive({ ...initState })
  const setState = (val: any) => {
    state.text = val.text
    state.height = val.height
    state.width = val.width
    state.top = val.top
    state.left = val.left
    state.right = val.right
    state.bottom = val.bottom
  }

  const stateRef = reactive({ ...state })

  const mouseupHandler = () => {
    let selObj: Selection | null = null
    let text = ''
    let rect = initRect
    if (!window.getSelection) return
    selObj = window.getSelection()
    text = selObj ? selObj.toString() : ''
    if (text) {
      rect = getRectFromSelection(selObj)
      setState({ ...state, text, ...rect })
    }
  }

  // 任意点击都需要清空之前的 range
  const mousedownHandler = () => {
    if (!window.getSelection) return
    if (stateRef.text) {
      setState({ ...initState })
    }
    const selObj = window.getSelection()
    if (!selObj) return
    selObj.removeAllRanges()
  }

  // 获取 target 需要放在 useEffect 里，否则存在组件未加载好的情况而导致元素获取不到
  const el = getTargetElement(target, document)

  if (!el) {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return state
  }

  // watch(el, () => {
  //   el.addEventListener('mouseup', mouseupHandler)
  //
  //   document.addEventListener('mousedown', mousedownHandler)
  // })

  onMounted(() => {
    el.addEventListener('mouseup', mouseupHandler)

    document.addEventListener('mousedown', mousedownHandler)
  })

  onUnmounted(() => {
    el.removeEventListener('mouseup', mouseupHandler)
    document.removeEventListener('mousedown', mousedownHandler)
  })
  return state
}
