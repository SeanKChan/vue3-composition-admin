/* eslint no-return-assign: off */
import { computed, nextTick, onMounted, onUnmounted, ref, Ref, watch } from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import useEventListener from './useEventListener'

dayjs.extend(relativeTime)

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  const inc = (delta = 1) => (count.value += delta)
  const dec = (delta = 1) => (count.value -= delta)
  const get = () => count.value
  const set = (val: number) => (count.value = val)
  const reset = (val = initialValue) => {
    initialValue = val // eslint-disable-line no-param-reassign
    return set(val)
  }
  const actions = {
    inc,
    dec,
    get,
    set,
    reset
  }

  return [count, actions] as const
}

export function useDate(
  d: dayjs.ConfigType = Date.now(),
  timeout = 0
) {
  const date = ref(dayjs(d))

  if (timeout) {
    let timerId: number

    onMounted(() => {
      timerId = window.setInterval(() => {
        date.value = dayjs(Date.now())
      }, timeout)
    })

    onUnmounted(() => {
      window.clearInterval(timerId)
    })
  }

  return date
}

export { dayjs }

export function useTimeout(delay = 0) {
  const ready = ref(false)
  let timerId: number

  onMounted(() => {
    timerId = window.setTimeout(() => {
      ready.value = true
    }, delay)
  })

  onUnmounted(() => {
    window.clearTimeout(timerId)
  })

  return ready
}

export function useMountedState() {
  const isMounted = ref(false)

  onMounted(async () => {
    await nextTick()
    isMounted.value = true
  })

  return isMounted
}

export function useWindowSize() {
  const width = ref(window.innerWidth)
  const height = ref(window.innerHeight)
  const update = () => {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }

  const widthPixel = computed(() => `${width.value}px`)
  const heightPixel = computed(() => `${height.value}px`)

  onMounted(() => {
    window.addEventListener('resize', update)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', update)
  })

  return {
    width,
    height,
    widthPixel,
    heightPixel
  }
}

export function usePrevious<T>(state: Ref<T> | (() => T)) {
  const previous = ref<T>()

  watch(state, (_, oldVal) => {
    previous.value = oldVal
  })

  return previous
}

export function usePageVisibility() {
  const visible = ref(true)

  const cb = () => {
    visible.value = document.visibilityState === 'visible'
  }

  useEventListener('visibilitychange', cb)

  return visible
}

export function useMousePosition() {
  const x = ref(0)
  const y = ref(0)
  const updateMouse = (e: MouseEvent) => {
    x.value = e.pageX
    y.value = e.pageY
  }
  // 鼠标点击时执行updateMouse函数
  onMounted(() => {
    document.addEventListener('click', updateMouse)
  })
  // 鼠标点击结束后对当前点击事件执行销毁操作
  onUnmounted(() => {
    document.removeEventListener('click', updateMouse)
  })
  // 返回x和y的值
  return {
    x,
    y
  }
}
