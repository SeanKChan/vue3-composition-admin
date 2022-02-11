import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'

import variables from '@/styles/_variables.scss'
import layoutSettings from '@/config/default/layout'

export interface SettingsState {
  theme: string
  fixedHeader: boolean
  showSettings: boolean
  showTagsView: boolean
  showSidebarLogo: boolean
  sidebarTextTheme: boolean
}

export const useSettingsStore = defineStore('settings', () => {
  const state: SettingsState = reactive({
    theme: variables.theme,
    fixedHeader: layoutSettings.fixedHeader,
    showSettings: layoutSettings.showSettings,
    showTagsView: layoutSettings.showTagsView,
    showSidebarLogo: layoutSettings.showSidebarLogo,
    sidebarTextTheme: layoutSettings.sidebarTextTheme
  })

  function changeSettings(k: string, v: any) {
    state[k] = v
  }

  return {
    ...toRefs(state),
    changeSettings
  }
})
