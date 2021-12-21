/*
 * @Description:
 * @Author: ZY
 * @Date: 2021-01-12 10:20:08
 * @LastEditors: ZY
 * @LastEditTime: 2021-01-12 10:20:45
 */
import { useUserStore } from '@/stores/user'

export const checkPermission = (value: string[]): boolean => {
  const userStore = useUserStore()
  if (value && value instanceof Array && value.length > 0) {
    const roles = userStore.roles
    const permissionRoles = value
    const hasPermission = roles.some(role => {
      return permissionRoles.includes(role)
    })
    return hasPermission
  } else {
    console.error('need roles! Like v-permission="[\'admin\',\'editor\']"')
    return false
  }
}
