<!--
 * @Description: 全屏按钮
 * @Author: ZY
 * @Date: 2020-12-23 18:11:46
 * @LastEditors: SCY
 * @LastEditTime: 2021-04-02 14:31:08
-->

<template>
  <div id="screenfull">
    <div
      v-if="isFullscreen"
      @click="click"
    >
      <svg
        class="icon"
        aria-hidden="true"
        font-size="40px"
      >
        <use xlink:href="#iconshiliangzhinengduixiang1" />
      </svg>
    </div>
    <div
      @click="click"
      v-else
    >
      <svg
        class="icon"
        aria-hidden="true"
        font-size="40px"
      >
        <use xlink:href="#iconshiliangzhinengduixiang1" />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { ElMessage } from 'element-plus'
import useFullscreen from '@/utils/hooks/useFullscreen'

export default defineComponent({
  setup() {
    const [isFullscreen, actions] = useFullscreen(document.body, {
      onNotSupport: () => {
        ElMessage({
          message: 'you browser can not work',
          type: 'warning'
        })
      }
    })

    const state = reactive({
      click: () => {
        actions.toggleFull()
      }
    })

    return {
      isFullscreen,
      ...toRefs(state)
    }
  }
})
</script>
