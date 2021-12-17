import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'
import { asyncRoutes, constantRoutes } from '@/router'
import { RouteRecordRaw } from 'vue-router'

export interface PermissionState {
  routes: RouteRecordRaw[]
  dynamicRoutes: RouteRecordRaw[]
}

const hasPermission = (roles: string[], route: RouteRecordRaw) => {
  if (route.meta && route.meta.roles) {
    return roles.some(role => {
      if (route.meta?.roles !== undefined) {
        return route.meta.roles.includes(role)
      }
    })
  } else {
    return true
  }
}

export const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]) => {
  const res: RouteRecordRaw[] = []
  routes.forEach(route => {
    const r = { ...route }
    if (hasPermission(roles, r)) {
      if (r.children) {
        r.children = filterAsyncRoutes(r.children, roles)
      }
      res.push(r)
    }
  })
  return res
}

export const usePermissionStore = defineStore('permission', () => {
  const state: PermissionState = reactive({
    routes: [],
    dynamicRoutes: []
  })

  function setRoutes(roles: string[]) {
    const accessedRoutes = roles.includes('admin') ? asyncRoutes : filterAsyncRoutes(asyncRoutes, roles)
    state.routes = constantRoutes.concat(accessedRoutes)
    state.dynamicRoutes = accessedRoutes
  }

  return {
    ...toRefs(state),
    setRoutes

  }
})
