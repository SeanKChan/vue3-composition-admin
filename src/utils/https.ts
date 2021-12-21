/*
 * @Description: axios 封装网络请求
 * @Author: ZY
 * @Date: 2020-12-28 14:45:32
 * @LastEditors: ZY
 * @LastEditTime: 2021-01-25 20:01:32
 */

import HttpClient, { HttpClientConfig } from 'axios-mapper'
import networkConfig from '@/config/default/net.config'
import { useUserStore } from '@/stores/user'

const https = (hasToken: Boolean = true) => {
  const userStore = useUserStore()
  const config: HttpClientConfig = {
    baseURL: networkConfig.host,
    headers: {
      token: hasToken ? userStore.token : ''
    }
  }
  return new HttpClient(config)
}

export default https
