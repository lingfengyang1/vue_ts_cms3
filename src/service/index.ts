import { localCache } from '@/utils/cache'
import { BASE_URL, TIME_OUT } from './config/constants'
import { HyRequest } from './request/request'
import { TOKEN } from '@/global/constants'

// 定义一些实例
const hyRequest1 = new HyRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  headers: {}
})

const hyRequest2 = new HyRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  headers: {},
  interceptors: {
    requestSuccessFn: (config) => {
      const token = localCache.getCache(TOKEN)
      if (token && config.headers) {
        config.headers.Authorization = 'Bearer ' + token
      }
      console.log('局部实例局部请求拦截成功')
      return config
    }
  }
})

export { hyRequest1, hyRequest2 }
