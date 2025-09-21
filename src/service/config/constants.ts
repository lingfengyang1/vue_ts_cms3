let BASE_URL = ''
// 开发环境和生产环境所使用到的服务器基路径有所不同
if (import.meta.env.PROD) {
  BASE_URL = 'http://152.136.185.210:4000'
} else {
  BASE_URL = 'http://codercba.com:5000'
}

const TIME_OUT = 10000

export { BASE_URL, TIME_OUT }
