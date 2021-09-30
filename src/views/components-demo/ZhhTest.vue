<template>
  <div>
    <div>
      <span>测试useDocumentVisibility</span>
      <span>{{ visbleState }}</span>
    </div>
    <div>
      测试useEventTarget
      <input
        style="width: 200px;"
        @Change="onChange"
        v-model="value"
      >
      <button
        type="button"
        @Click="reset"
      >
        reset
      </button>
    </div>
    <div>
      测试useClickAway
      <span ref="elmRefs">
        <button
          type="button"
          id="box2"
        >box1</button>
      </span>
      <p>counter: {{ counter }}</p>
    </div>
    <div>
      测试useFavicon
      <p>
        Current Favicon: <span>{{ urlTest }}</span>
      </p>
      <button
        @Click="() => {
          setUrl(GOOGLE_FAVICON_URL);
        }"
      >
        Change To Google Favicon
      </button>
      <button
        @Click="() => {
          setUrl(DEFAULT_FAVICON_URL);
        }"
      >
        Back To AHooks Favicon
      </button>
    </div>
    <div>
      测试useHover
      <div ref="elmRefs">
        haha
        {{ isHovering }}
      </div>
    </div>
    <div>
      测试useExternal
      <p>
        Status: <b>{{ status }}</b>
      </p>
      <button
        type="button"
        @Click="toggle"
      >
        toggle
      </button>
      <button
        type="button"
        @Click="unload"
      >
        unload
      </button>
      <button
        type="button"
        @Click="load"
      >
        load
      </button>
    </div>
    <div>
      测试useEventListener
      <button
        ref="refListener"
        type="button"
      >
        You click {{ valueListener }} times
      </button>
    </div>
    <div>
      测试useKeyPress
      <p>Try pressing the following: </p>
      <div>1. Press ArrowUp by key to increase</div>
      <div>2. Press ArrowDown by keyCode to decrease</div>
      <div>
        counter: <span>{{ keyPressCounter }}</span>
      </div>
    </div>
    <div>测试useMouse Mouse Pos: {{ JSON.stringify(mouse) }}</div>
    <div>
      <p>Please change the width of the browser window to see the effect: </p>
      <div
        v-for=" (item, index) in responsive"
        :key="index"
      >
        {{ item }} -- {{ index }}
      </div>
    </div>
    <div>
      <p>测试useTextSelection You can select text all page.</p>
      <p>Result：{{ text }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref, toRefs } from 'vue'
import useDocumentVisibility from '@/utils/hooks/useDocumentVisibility'
import useEventTarget from '@/utils/hooks/useEventTarget'
import useClickAway from '@/utils/hooks/useClickAway'
import useFavicon from '@/utils/hooks/useFavicon'
import useHover from '@/utils/hooks/useHover'
import useExternal from '@/utils/hooks/useExternal'
import useEventListener from '@/utils/hooks/useEventListener'
import useKeyPress from '@/utils/hooks/useKeyPress'
import useMouse from '@/utils/hooks/useMouse'
import { configResponsive, useResponsive } from '@/utils/hooks/useResponsive'
import useTextSelection from '@/utils/hooks/useTextSelection'

export default defineComponent({

  setup() {
    const { ctx } = getCurrentInstance() as any
    console.log(document.visibilityState)
    const visbleState = useDocumentVisibility()
    const { value, onChange, reset } = useEventTarget({ transformer: (val: string) => val.replace(/[^\d]/g, '') })
    // const elmRefs = ref<null | HTMLElement>(null)
    const counter = ref<number>(0)
    const setValue = (val: number) => {
      counter.value = val + 1
    }
    useClickAway(() => { setValue(counter.value) }, () => document.getElementById('box2'))
    const DEFAULT_FAVICON_URL = 'https://ahooks.js.org/simple-logo.svg'

    const GOOGLE_FAVICON_URL = 'https://www.google.com/favicon.ico'
    const urlTest = ref(DEFAULT_FAVICON_URL)
    const setUrl = (val: any) => {
      urlTest.value = val
    }
    useFavicon(urlTest.value)
    const elmRefs = ref<null | HTMLElement>(null)
    const isHovering = ref()
    isHovering.value = useHover(elmRefs.value)

    const { status, toggle, load, unload } = useExternal('./index.js')

    const refListener = ref<null | HTMLElement>(null)
    const valueListener = ref<number>(0)
    const clickHandler = () => {
      valueListener.value = valueListener.value + 1
    }
    console.log(refListener.value + '111')
    useEventListener('click', clickHandler, { target: refListener.value })

    const keyPressCounter = ref<number>(0)
    const setKeyPressCounter = (val: number) => { keyPressCounter.value = keyPressCounter.value + val }
    useKeyPress('ArrowUp', () => {
      setKeyPressCounter(1)
    })
    useKeyPress(40, () => {
      setKeyPressCounter(-1)
    })
    const mouse = useMouse()

    configResponsive({
      small: 0,
      middle: 800,
      large: 1200
    })
    const responsive = useResponsive()
    const stateText = useTextSelection()
    console.warn(stateText)
    return {
      ctx,
      useDocumentVisibility,
      visbleState,
      value,
      onChange,
      reset,
      setValue,
      counter,
      urlTest,
      setUrl,
      DEFAULT_FAVICON_URL,
      GOOGLE_FAVICON_URL,
      elmRefs,
      isHovering,
      status,
      toggle,
      load,
      unload,
      useExternal,
      valueListener,
      refListener,
      keyPressCounter,
      mouse,
      responsive,
      ...toRefs(stateText)
    }
  }
})
</script>

<style scoped>

</style>
