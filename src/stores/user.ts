import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'
import { getToken, removeToken, setToken } from '@/utils/cookies'
import { loginRequest, userInfoRequest } from '@/apis/user'
import router, { resetRouter } from '@/router'
import { usePermissionStore } from './permission'
import { RouteRecordRaw } from 'vue-router'

export interface UserState {
  token: string
  name: string
  avatar: string
  introduction: string
  roles: string[]
  email: string
}

export const useUserStore = defineStore('user', () => {
  const state: UserState = reactive({
    token: getToken() || '',
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    email: ''
  })

  async function login(userInfo: {
    username: string
    password: string
  }) {
    const res = await loginRequest(userInfo)
    if (res?.code === 0 && res.data.accessToken) {
      setToken(res.data.accessToken)
      state.token = res.data.accessToken
    }
  }

  function resetToken() {
    removeToken()
    state.token = ''
    state.roles = []
  }

  async function getUserInfo() {
    if (state.token === '') {
      throw Error('token is undefined!')
    }

    const res = await userInfoRequest()
    if (res === null || res?.code) {
      throw Error('Verification failed, please Login again.')
      return
    }
    const { roles, name, avatar, introduction, email } = res.data
    state.roles = roles
    state.name = name
    state.avatar = avatar
    state.introduction = introduction
    state.email = email
    return res
  }

  async function changeRoles(role: string) {
    const token = role + '-token'
    state.token = token
    setToken(token)
    await getUserInfo()
    const permissionStore = usePermissionStore()
    permissionStore.setRoutes(state.roles)
    const dynamicRoutes = permissionStore.dynamicRoutes as RouteRecordRaw[]
    dynamicRoutes.forEach((item: RouteRecordRaw) => {
      router.addRoute(item)
    })
  }

  async function logout() {
    removeToken()
    state.token = ''
    state.roles = []
    resetRouter()
  }

  return {
    ...toRefs(state),
    login,
    resetToken,
    getUserInfo,
    changeRoles,
    logout
  }
})
