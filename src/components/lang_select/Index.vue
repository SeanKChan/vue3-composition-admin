<!--
 * @Description: 语言选择
 * @Author: ZY
 * @Date: 2020-12-23 20:06:29
 * @LastEditors: SCY
 * @LastEditTime: 2021-04-02 14:33:32
-->
<template>
  <div>
    <el-dropdown>
      <svg
        :class="{'svg-color': isWhite}"
        aria-hidden="true"
        class="icon"
        font-size="45px"
      >
        <use xlink:href="#iconzhongyingwen" />
      </svg>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="item in languages"
            :key="item.value"
            :disabled="language===item.value"
          >
            <span @click="handleSetLanguage(item.value)">{{ item.name }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { useAppStore } from '@/stores/app'

type Language = {
  name: string
  value: string
}

export default defineComponent({
  props: {
    isWhite: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const appStore = useAppStore()
    const { locale } = useI18n()

    const state = reactive({
      languages: [{
        name: 'en',
        value: 'en'
      }, {
        name: '中文',
        value: 'zh-cn'
      }] as Array<Language>,
      handleSetLanguage: (lang: string) => {
        locale.value = lang
        appStore.changeLanguage(lang)
        ElMessage({
          message: 'Switch Language Success',
          type: 'success'
        })
      }
    })
    const language = computed(() => {
      return appStore.language
    })
    return {
      ...toRefs(state),
      language
    }
  }
})

</script>

<style lang="scss" scoped>
.svg-color {
  fill: white;
}
</style>
