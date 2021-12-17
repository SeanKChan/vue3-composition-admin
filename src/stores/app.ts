import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'

import { getSidebarStatus, getSize, setSidebarStatus, setLanguage, setSize } from '@/utils/cookies'
import { getLocale } from '@/locales'

export enum DeviceType {
  Mobile,
  Desktop,
}

export interface AppState {
  device: DeviceType
  sidebar: {
    opened: boolean
    withoutAnimation: boolean
  }
  language: string
  size: string
}

export const useAppStore = defineStore('app', () => {
  const state: AppState = reactive({
    device: DeviceType.Desktop,
    sidebar: {
      opened: getSidebarStatus() !== 'closed',
      withoutAnimation: false
    },
    language: getLocale(),
    size: getSize() || 'medium'
  })

  function toggleSideBar() {
    setSidebarStatus(state.sidebar.opened ? 'opened' : 'closed')
  }

  function closeSideBar() {
    setSidebarStatus('closed')
  }

  function toggleDevice(device: DeviceType) {
    state.device = device
  }

  function changeLanguage(language: string) {
    state.language = language
    setLanguage(state.language)
  }

  function changeSize(size: string) {
    state.size = size
    setSize(state.size)
  }

  return {
    ...toRefs(state),
    toggleSideBar,
    closeSideBar,
    toggleDevice,
    changeLanguage,
    changeSize
  }
})
