/*
 * @Description: element 组件
 * @Author: ZY
 * @Date: 2020-12-25 08:45:49
 * @LastEditors: ZY
 * @LastEditTime: 2021-01-26 13:25:55
 */

// import {
//   ElButton,
//   ElSelect,
//   ElBreadcrumb,
//   ElBreadcrumbItem,
//   ElIcon,
//   ElDropdown,
//   ElDropdownMenu,
//   ElDropdownItem,
//   ElPopover,
//   ElMessage,
//   ElForm,
//   ElFormItem,
//   ElLoading,
//   ElInput,
//   ElTooltip,
//   ElDialog,
//   ElScrollbar,
//   ElMenu,
//   ElMenuItem,
//   ElSubmenu
// } from 'element-plus'

/**
 *  系统的全局设置size，全部加载方便设置。
 *  如需按需加载:
 *  1.放开注释
 *  2.引入babel-plugin-component库
 *  3.放开babel.config 注释
 */
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import i18n from '@/locales'
import { createPinia } from 'pinia'
import { useAppStore } from '@/stores/app'

export default function loadComponent(app: any) {
  const pinia = createPinia()
  const appStore = useAppStore(pinia)
  app.use(ElementPlus, { size: appStore.size, i18n: i18n.global.t })
}
