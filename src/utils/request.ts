import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import networkConfig from '@/config/default/net.config'
import { useUserStore } from '@/stores/user'
import { ElMessage, ElMessageBox } from 'element-plus'
import { RootObject } from '@/model/rootObject'
import { useAxios } from '@vueuse/integrations/useAxios'

const request = Axios.create({
  baseURL: networkConfig.host,
  timeout: networkConfig.timeout
})

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}

// Request interceptors
request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const userStore = useUserStore()
    // Add X-Access-Token header to every request, you can add other custom headers here
    if (userStore.token && config.headers) {
      config.headers['X-Access-Token'] = userStore.token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Response interceptors
request.interceptors.response.use(
  (response: AxiosResponse) => {
    // Some example codes here:
    // code == 0: success
    // code == 50001: invalid access token
    // code == 50002: already login in other place
    // code == 50003: access token expired
    // code == 50004: invalid user (user not exist)
    // code == 50005: username or password is incorrect
    // You can change this part for your own usage.

    const res = response.data as RootObject<any>
    if (res.code > 0) {
      ElMessage({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        ElMessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          const userStore = useUserStore()
          userStore.resetToken()
          location.reload() // To prevent bugs from vue-router
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    }
    return response.data
  },
  (error) => {
    let errorText = error.message || 'error'
    if (Axios.isAxiosError(error)) {
      if (error.response) {
        const { status, statusText } = error.response
        errorText = codeMessage[status] || statusText
      }
    }
    ElMessage({
      message: errorText,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export function useRequest<T>(url: string, config: AxiosRequestConfig) {
  return useAxios<T>(url, config, request)
}

export default request
