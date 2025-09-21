import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'
import type { HyRequestConfig } from '../config/hy-config'

// 对axios库进行二次封装
class HyRequest {
  instance: AxiosInstance

  constructor(config: HyRequestConfig) {
    this.instance = axios.create(config)

    // 配置一些全局拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('请求成功时的全局拦截器')
        return config
      },
      (err) => {
        console.log('请求失败时的全局拦截器', err)
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        console.log('响应成功时的全局拦截器')
        return res.data
      },
      (err) => {
        console.log('响应失败时的全局拦截器', err)
      }
    )

    // 配置一些额外传入的全局拦截器(如果interceptors中的拦截函数为空的话 那么use相当于不会进行任何拦截直接进入下一步骤)
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    )
  }

  request<T = any>(config: HyRequestConfig<T>) {
    // 指定局部拦截器(局部指代的是只有当前请求可以使用的拦截器 而全局指代的是当前实例中每一个请求都可以使用的拦截器)
    // 如果要只为当前请求注册拦截器的话 那么我们就不能够像注册局部拦截器那样通过this.instance进行拦截器注册(因为一旦注册过后 当前实例的后续所有请求都会共享当前所注册的这个拦截器了)
    try {
      if (config.interceptors?.requestSuccessFn) {
        config = config.interceptors.requestSuccessFn(config)
      }
      return new Promise<AxiosResponse<T>>((resolve, reject) => {
        this.instance
          .request(config)
          .then((res) => {
            if (config.interceptors?.responseSuccessFn) {
              res = config.interceptors.responseSuccessFn(res)
            }
            resolve(res)
          })
          .catch((err) => {
            if (config.interceptors?.responseFailureFn) {
              config.interceptors.responseFailureFn(err)
            }
            reject(err)
          })
      })
    } catch (err) {
      if (config.interceptors?.requestFailureFn) {
        config.interceptors.requestFailureFn(err)
      }
    }
  }

  get<T = any>(config: HyRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: HyRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'POST' })
  }

  patch<T = any>(config: HyRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'PATCH' })
  }

  delete<T = any>(config: HyRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
}

export { HyRequest }
