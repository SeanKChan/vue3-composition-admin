<template>
  <div>
    <!--    <div>-->
    <!--      测试useEventListener-->
    <!--      <button-->
    <!--        id="btn"-->
    <!--        type="button"-->
    <!--      >-->
    <!--        You click {{ valueListener }} times-->
    <!--      </button>-->
    <!--    </div>-->
    <!--    <div>-->
    <!--      测试useHover-->
    <!--      <div id="elmRefs">-->
    <!--        haha-->
    <!--        {{ isHovering }}-->
    <!--      </div>-->
    <!--    </div>-->
    <div id="demo2">
      '测试useInViewport'
    </div>
    <div>22222</div>
    <div>22222</div>
    <div>22222</div>
    <div>22222</div>
    <div
      v-if="inViewPort"
      style="background: red"
    >
      {{ inViewPort }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import useInViewport from '@/utils/hooks/useInViewport'
// import useEventListener from '@/utils/hooks/useEventListener'
// import useHover from '@/utils/hooks/useHover'

export default defineComponent({

  setup() {
    // const valueListener = ref<number>(0)
    // const clickHandler = () => {
    //   valueListener.value = valueListener.value + 1
    // }
    // console.log(document.getElementById('btn') + 'document.getElementById')
    // useEventListener('click', clickHandler, { target: () => document.getElementById('btn') })
    // const isHovering = useHover(() => document.getElementById('elmRefs'))
    const inViewPort = ref(useInViewport(() => document.querySelector('#demo2')))
    console.log(inViewPort.value + 'inViewPort')
    return {
      inViewPort
      // valueListener,
      // isHovering
    }
  }
})
</script>

<style scoped>

</style>
