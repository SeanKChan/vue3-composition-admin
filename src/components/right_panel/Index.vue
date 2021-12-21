<!--
 * @Description:
 * @Author: ZY
 * @Date: 2020-12-24 10:44:01
 * @LastEditors: ZY
 * @LastEditTime: 2021-03-25 08:27:00
-->

<template>
  <div
    :style="{'top': buttonTop+'px','backgroundColor': theme}"
    class="handle-button"
    @click="show= true"
  >
    <i class="el-icon-setting" />
  </div>
  <el-drawer
    v-model="show"
    :direction="direction"
    destroy-on-close
    size="300px"
    title="设置"
  >
    <slot />
  </el-drawer>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useSettingsStore } from '@/stores/settings'

export default defineComponent({
  props: {
    buttonTop: {
      type: Number,
      default: 250
    }
  },
  setup() {
    const show = ref(false)
    const settingsStore = useSettingsStore()
    const theme = computed(() => {
      return settingsStore.theme
    })
    return {
      show,
      theme
    }
  }
})
</script>

<style lang="scss" scoped>

.handle-button {
  width: 48px;
  height: 48px;
  position: absolute;
  right: 0px;
  text-align: center;
  font-size: 24px;
  border-radius: 6px 0 0 6px !important;
  z-index: 99;
  cursor: pointer;
  pointer-events: auto;
  color: #fff;
  line-height: 48px;

  i {
    font-size: 24px;
    line-height: 48px;
  }
}
</style>
