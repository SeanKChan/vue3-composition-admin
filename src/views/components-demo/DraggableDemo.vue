<template>
  <div class="components-container">
    <div class="parent">
      <Vue3DraggableResizable
        v-model:active="active"
        v-model:h="h"
        v-model:w="w"
        v-model:x="x"
        v-model:y="y"
        :draggable="true"
        :initH="120"
        :initW="110"
        :resizable="true"
        @activated="print('activated')"
        @deactivated="print('deactivated')"
        @dragging="print('dragging')"
        @resizing="print('resizing')"
        @drag-start="print('drag-start')"
        @resize-start="print('resize-start')"
        @drag-end="print('drag-end')"
        @resize-end="print('resize-end')"
      >
        This is a test example
      </Vue3DraggableResizable>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import Vue3DraggableResizable from 'vue3-draggable-resizable'
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'

export default defineComponent({
  components: {
    Vue3DraggableResizable
  },
  setup() {
    const state = reactive({
      x: 100,
      y: 100,
      h: 100,
      w: 100,
      active: false
    })

    const print = (val: any) => {
      console.info(val)
    }

    return {
      ...toRefs(state),
      print
    }
  }
})
</script>

<style lang="scss" scoped>
.parent {
  width: 200px;
  height: 200px;
  position: absolute;
  top: 100px;
  left: 100px;
  border: 1px solid #000;
  user-select: none;
}
</style>
