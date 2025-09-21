import { AxiosResponse, InternalAxiosRequestConfig } from 'axios'

// 自定义配置类(AxiosRequestConfig的泛型指代的是请求携带参数的类型)
interface HyRequestConfig<T = any> extends InternalAxiosRequestConfig {
  // baseURL/timeout这些属性已经在AxiosRequestConfig中定义并继承了 因此可以不用于此再次定义

  // 针对某个axios实例的拦截器(可以不为某个axios实例设置拦截器 也可以只为其设置部分拦截器)
  interceptors?: {
    requestSuccessFn?: (config: HyRequestConfig<T>) => HyRequestConfig<T>
    requestFailureFn?: (err: any) => any
    responseSuccessFn?: (res: AxiosResponse<T>) => AxiosResponse<T>
    responseFailureFn?: (res: any) => any
  }

  headers: any
}

export { HyRequestConfig }
