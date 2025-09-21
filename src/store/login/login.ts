import { defineStore } from 'pinia'
import type { IAccount, ILoginState } from '@/types'
import {
  postAccountLogin,
  getUserInfo,
  getUserMenus
} from '@/service/login/login'
import router from '@/router'
import { localCache } from '@/utils/cache'
import { TOKEN } from '@/global/constants'
import { USER_INFO, USER_MENUS } from './constants'
import { mapMenuToRouter } from '@/utils/mapper'
import useMainStore from '../main/main'

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: []
  }),
  actions: {
    async accountLoginAction(account: IAccount) {
      const res = await postAccountLogin(account)
      console.log(res)
      const { token, id } = res.data
      this.token = token
      localCache.setCache(TOKEN, token)

      // 同时保存一些当前用户的相关信息 比如所拥有的角色信息等等
      const res2 = await getUserInfo(id)
      console.log(res2)
      this.userInfo = res2.data
      localCache.setCache(USER_INFO, this.userInfo)

      // 同时保存一些当前用户的所拥有的菜单/权限信息
      const roleId = res2.data.role.id
      const res3 = await getUserMenus(roleId)
      console.log(res3)
      this.userMenus = res3.data
      localCache.setCache(USER_MENUS, this.userMenus)

      // 同时获取一下角色列表和部门列表信息
      const mainStore = useMainStore()
      mainStore.getEntireAction()

      // 注册动态路由
      const userRoutes = mapMenuToRouter(this.userMenus)
      for (const userRoute of userRoutes) {
        router.addRoute('main', userRoute)
      }

      // 跳转到main页面(hook不允许再其他hook或者setup以外的地方定义 比如此处 所以只能够导入router模块中导出的router了)
      router.push('/main')
      return res
    },

    // 刷新时store/router会清空 需要重新加载
    async reloadStoreAction() {
      const token = localCache.getCache(TOKEN)

      const userInfo = localCache.getCache(USER_INFO)

      const userMenus = localCache.getCache(USER_MENUS)

      if (token && userInfo && userMenus) {
        this.token = token

        this.userInfo = userInfo

        this.userMenus = userMenus

        const userRoutes = mapMenuToRouter(userMenus)
        for (const userRoute of userRoutes) {
          router.addRoute('main', userRoute)
        }

        const mainStore = useMainStore()
        mainStore.getEntireAction()
      }
    }
  }
})

export default useLoginStore
