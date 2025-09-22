import {
  getAddressSale,
  getAmountList,
  getCategoryCount,
  getCategorySale
} from '@/service/main/analysis/analysis'
import type { IAnalysisState } from '@/types/main/analysis/analysis'
import { defineStore } from 'pinia'

const useAnalysisStore = defineStore('analysis', {
  state: (): IAnalysisState => ({
    amountList: [],
    categoryCount: [],
    categorySale: [],
    addressSale: []
  }),
  actions: {
    async loadAmountDataAction() {
      const res = await getAmountList()
      this.amountList = res?.data

      const res2 = await getCategoryCount()
      this.categoryCount = res2?.data

      const res3 = await getCategorySale()
      this.categorySale = res3?.data

      const res4 = await getAddressSale()
      this.addressSale = res4?.data
    }
  }
})

export default useAnalysisStore
