import { onUnmounted, ref } from 'vue'
import screenfull from 'screenfull'
import { BasicTarget, getTargetElement } from '../dom'

export interface Options {
  onNotSupport?: () => void
  onExitFull?: () => void
  onFull?: () => void
}

export default function useFullscreen(target: BasicTarget, options?: Options) {
  const { onExitFull, onFull, onNotSupport } = options || {}

  const isFullscreenRef = ref(false)

  const onChange = () => {
    if (screenfull.isEnabled) {
      const { isFullscreen } = screenfull
      if (isFullscreen) {
        onFull && onFull()
      } else {
        screenfull.off('change', onChange)
        onExitFull && onExitFull()
      }
      isFullscreenRef.value = isFullscreen
    } else {
      onNotSupport && onNotSupport()
    }
  }

  const setFull = () => {
    const el = getTargetElement(target)
    if (!el) {
      return
    }

    if (screenfull.isEnabled) {
      try {
        screenfull.request(el as HTMLElement)
        screenfull.on('change', onChange)
      } catch (error) {
        console.error('setFull Error', error)
      }
    }
  }

  const exitFull = () => {
    if (!isFullscreenRef.value) {
      return
    }
    if (screenfull.isEnabled) {
      screenfull.exit()
    }
  }

  const toggleFull = () => {
    if (isFullscreenRef.value) {
      exitFull()
    } else {
      setFull()
    }
  }

  onUnmounted(() => {
    if (screenfull.isEnabled) {
      screenfull.off('change', onChange)
    }
  })

  return [
    isFullscreenRef,
    {
      setFull,
      exitFull,
      toggleFull
    }] as const
}
