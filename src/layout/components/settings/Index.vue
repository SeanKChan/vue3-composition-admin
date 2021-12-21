<!--
 * @Description: 设置页面
 * @Author: ZY
 * @Date: 2020-12-17 16:05:05
 * @LastEditors: ZY
 * @LastEditTime: 2021-01-27 13:48:18
-->
<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">
        {{ t('settings.title') }}
      </h3>

      <div class="drawer-item">
        <span>{{ t('settings.theme') }}</span>
        <ThemePicker
          style="float: right;height: 26px;margin: -3px 8px 0 0;"
          @change="themeChange"
        />
      </div>

      <div class="drawer-item">
        <span>{{ t('settings.showTagsView') }}</span>
        <el-switch
          v-model="showTagsView"
          class="drawer-switch"
        />
      </div>

      <div class="drawer-item">
        <span>{{ t('settings.showSidebarLogo') }}</span>
        <el-switch
          v-model="showSidebarLogo"
          class="drawer-switch"
        />
      </div>

      <div class="drawer-item">
        <span>{{ t('settings.fixedHeader') }}</span>
        <el-switch
          v-model="fixedHeader"
          class="drawer-switch"
        />
      </div>

      <div class="drawer-item">
        <span>{{ t('settings.sidebarTextTheme') }}</span>
        <el-switch
          v-model="sidebarTextTheme"
          class="drawer-switch"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from 'vue'
import ThemePicker from '@/components/theme-picker/Index.vue'
import { useI18n } from 'vue-i18n'
import { useSettingsStore } from '@/stores/settings'

export default defineComponent({
  components: {
    ThemePicker
  },
  setup() {
    const settingsStore = useSettingsStore()
    const { t } = useI18n()
    const state = reactive({
      fixedHeader: settingsStore.fixedHeader,
      showTagsView: settingsStore.showTagsView,
      showSidebarLogo: settingsStore.showSidebarLogo,
      sidebarTextTheme: settingsStore.sidebarTextTheme,
      themeChange: (v: string) => {
        settingsStore.changeSettings('theme', v)
      }
    })

    watch(() => state.fixedHeader, (v) => {
      settingsStore.changeSettings('fixedHeader', v)
    })

    watch(() => state.showTagsView, (v) => {
      settingsStore.changeSettings('showTagsView', v)
    })

    watch(() => state.showSidebarLogo, (v) => {
      settingsStore.changeSettings('showSidebarLogo', v)
    })

    watch(() => state.sidebarTextTheme, (v) => {
      settingsStore.changeSettings('sidebarTextTheme', v)
    })

    return {
      t,
      ...toRefs(state)
    }
  }
})
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, .85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, .65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right
  }
}
</style>
