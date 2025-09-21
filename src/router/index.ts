import { TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { firstMenu } from '@/utils/mapper'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  // 路由模式
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/Login.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('@/views/main/Main.vue')
    }
  ]
})

router.beforeEach((to) => {
  const token = localCache.getCache(TOKEN)

  // 如果未登录就直接访问以main为前缀的页面的话 那么就会先跳转到登录页面进行登录操作
  if (to.path.startsWith('/main') && !token) {
    return '/login'
  }

  // 如果进入的是/main路径的话 那么将其重定向到第一个页面路径上
  if (to.path === '/main') return firstMenu.url
})

export default router
