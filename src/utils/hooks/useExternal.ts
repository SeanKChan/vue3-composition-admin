import { ref, watch } from 'vue'
import { getTargetElement, BasicTarget } from '../dom'

export interface Options {
  type?: 'js' | 'css' | 'img'
  media?: HTMLLinkElement['media']
  async?: boolean
  target?: BasicTarget
}

export type Status = 'unset' | 'loading' | 'ready' | 'error';

export type Action = {
  toggle: () => void
  load: () => void
  unload: () => void
};

export type ExternalElement = HTMLScriptElement | HTMLLinkElement | HTMLImageElement;

export default function useExternal(path: string, options?: Options) {
  const isPath = typeof path === 'string' && path !== ''

  const status = ref<Status>(isPath ? 'loading' : 'unset')
  const setStatus = (val:Status) => { status.value = val }

  const active = ref<boolean>(isPath)
  const setActive = (val: any) => { active.value = val }

  const refValue = ref<ExternalElement>()

  const unload: () => void = () => setActive(false)
  const load: () => void = () => setActive(true)
  const toggle: () => void = () => setActive(!active.value)

  watch([active, path], () => {
    if (refValue.value) { refValue.value.remove() }

    if (!isPath || !active.value) {
      setStatus('unset')
      refValue.value = undefined
      return
    }

    status.value = 'loading'
    // Create external element
    const pathname = path.replace(/[|#].*$/, '')
    if (options?.type === 'css' || /(^css!|\.css$)/.test(pathname)) {
      // css
      refValue.value = document.createElement('link')
      refValue.value.rel = 'stylesheet'
      refValue.value.href = path
      refValue.value.media = options?.media || 'all'
      // IE9+
      const isLegacyIECss = 'hideFocus' in refValue.value
      // use preload in IE Edge (to detect load errors)
      if (isLegacyIECss && refValue.value.relList) {
        refValue.value.rel = 'preload'
        refValue.value.as = 'style'
      }
      refValue.value.setAttribute('data-status', 'loading')
      document.head.appendChild(refValue.value)
    } else if (options?.type === 'js' || /(^js!|\.js$)/.test(pathname)) {
      // javascript
      refValue.value = document.createElement('script')
      refValue.value.src = path
      refValue.value.async = options?.async === undefined ? true : options?.async
      refValue.value.setAttribute('data-status', 'loading')
      document.body.appendChild(refValue.value)
    } else if (options?.type === 'img' || /(^img!|\.(png|gif|jpg|svg|webp)$)/.test(pathname)) {
      // image
      refValue.value = document.createElement('img')
      refValue.value.src = path
      refValue.value.setAttribute('data-status', 'loading')
      // append to wrapper
      const wrapper = (getTargetElement(options?.target) as HTMLElement) || document.body
      if (wrapper) {
        wrapper.appendChild(refValue.value)
      }
    } else {
      // do nothing
      console.error(
        "Cannot infer the type of external resource, and please provide a type ('js' | 'css' | 'img'). " +
        'Refer to the https://ahooks.js.org/hooks/dom/use-external/#options'
      )
    }

    if (!refValue.value) return

    // Bind setAttribute Event
    const setAttributeFromEvent = (event: Event) => {
      return refValue.value?.setAttribute('data-status', event.type === 'load' ? 'ready' : 'error')
    }
    refValue.value.addEventListener('load', setAttributeFromEvent)
    refValue.value.addEventListener('error', setAttributeFromEvent)

    const setStateFromEvent = (event: Event) => {
      setStatus(event.type === 'load' ? 'ready' : 'error')
    }
    refValue.value.addEventListener('load', setStateFromEvent)
    refValue.value.addEventListener('error', setStateFromEvent)
  })

  return { status, unload, load, toggle }
}
