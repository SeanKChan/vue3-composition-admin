import StaticAxios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosStatic } from 'axios'
import LRUCache from 'lru-cache'
import { IAction, useReducer } from '@/utils/hooks/useReducer'
import { reactive } from 'vue'

export interface Options {
  axios?: AxiosInstance | AxiosStatic | any
  manual?: boolean
  useCache?: boolean
  autoCancel?: boolean
}

export interface State<T = any> {
  loading: boolean
  data?: T
  error?: any
  response?: AxiosResponse | null
}

const enum RequestAction {
  REQUEST_START = 'REQUEST_START',
  REQUEST_END = 'REQUEST_END'
}

const DEFAULT_OPTIONS = {
  axios: StaticAxios,
  manual: false,
  useCache: true,
  autoCancel: true
}

/**
 * 创建Cache key
 * @param config axios请求配置
 */
function createCacheKey(config: AxiosRequestConfig) {
  const cleanedConfig = { ...config }
  delete cleanedConfig.cancelToken

  return JSON.stringify(cleanedConfig)
}

/**
 * 配置参数转为对象
 * @param config
 */
function configToObject(config: AxiosRequestConfig) {
  if (typeof config === 'string') {
    return {
      url: config
    }
  }

  return Object.assign({}, config)
}

export function useAxios(config: AxiosRequestConfig, options: Options) {
  let cache: LRUCache<any, any>
  let axiosInstance: AxiosInstance
  if (options.axios) {
    axiosInstance = options.axios
  }
  if (options.useCache) {
    cache = new LRUCache()
  }

  const _config = reactive(configToObject(config))
  const _options = reactive(options)

  function tryStoreInCache(config: AxiosRequestConfig, response: AxiosResponse) {
    if (!cache) {
      return
    }

    const cacheKey = createCacheKey(config)

    const responseForCache = { ...response }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete responseForCache.config
    delete responseForCache.request

    cache.set(cacheKey, responseForCache)
  }

  function tryGetFromCache(config: AxiosRequestConfig, options: Options, dispatch: Function) {
    if (!cache || !options.useCache) {
      return
    }
    const cacheKey = createCacheKey(config)
    const response = cache.get(cacheKey)

    if (response && dispatch) {
      dispatch({
        type: RequestAction.REQUEST_END,
        payload: response
      })
    }

    return response
  }

  function createInitialState(config: AxiosRequestConfig, options: Options) {
    const response = !options.manual && tryGetFromCache(config, options, dispatch)
    return {
      loading: !options.manual && !response,
      error: null,
      data: response ? response.data : null,
      response: response ?? null
    }
  }

  function reducer(action: IAction) {
    const {
      type,
      payload,
      err
    } = action
    switch (type) {
      default:
        break
      case RequestAction.REQUEST_START:
        return {
          loading: true,
          error: null,
          data: payload ? payload.data : null,
          response: payload ?? null
        }
      case RequestAction.REQUEST_END:
        return {
          loading: false,
          error: err ? payload : null,
          data: payload ? payload.data : null,
          response: payload ?? null
        }
    }
  }

  const {
    state,
    dispatch
  } = useReducer(reducer, createInitialState(config, options))

  async function executeRequest(config: AxiosRequestConfig, dispatch: Function) {
    try {
      dispatch({ type: RequestAction.REQUEST_START })
      const response = await axiosInstance(config)
      tryStoreInCache(config, response)
      dispatch({
        type: RequestAction.REQUEST_END,
        payload: response
      })
      return response
    } catch (err) {
      if (StaticAxios.isCancel(err)) {
        dispatch({
          type: RequestAction.REQUEST_END,
          payload: err,
          err: true
        })
        throw err
      }
    }
  }

  async function request(config: AxiosRequestConfig, options: Options) {
    return (
      tryGetFromCache(config, options, dispatch) ||
      executeRequest(config, dispatch)
    )
  }

  const cancelSource = reactive(StaticAxios.CancelToken.source())
  _config.cancelToken = cancelSource.token
  if (!_options.manual) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    request(_config, _options).catch()
  }
}
