import {
  postEntireDepartments,
  postEntireRoles,
  postMenuList
} from '@/service/main/main'
import type { IMainState } from '@/types/main/main'
import { defineStore } from 'pinia'

const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    entireRoles: [],
    entireDepartments: [],
    menuList: []
  }),
  actions: {
    async getEntireAction() {
      const res = await postEntireRoles()
      this.entireRoles = res?.data.list

      const res2 = await postEntireDepartments()
      this.entireDepartments = res2?.data.list

      const res3 = await postMenuList()
      this.menuList = res3?.data.list
    }
  }
})

export default useMainStore
