import {
  deleteDeletePage,
  patchEditPage,
  postNewPage,
  postPageList
} from '@/service/main/system/system'
import type { ISystemState } from '@/types/main/system/system'
import { defineStore } from 'pinia'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    pageCount: 0,
    pageList: []
  }),
  actions: {
    async loadPageListAction(pageName: string, pageInfo: any) {
      const res: any = await postPageList(pageName, pageInfo)
      console.log(res)
      const { list, totalCount } = res.data
      this.pageCount = totalCount
      this.pageList = list
    },
    async newPageAction(pageName: string, pageInfo: any) {
      await postNewPage(pageName, pageInfo)

      // 重新加载列表数据
      this.loadPageListAction(pageName, { offset: 0, size: 10 })
    },
    async editPageAction(pageName: string, id: number, pageInfo: any) {
      await patchEditPage(pageName, id, pageInfo)

      this.loadPageListAction(pageName, { offset: 0, size: 10 })
    },
    async deletePageAction(pageName: string, id: number) {
      await deleteDeletePage(pageName, id)

      this.loadPageListAction(pageName, id)
    }
  }
})

export default useSystemStore
