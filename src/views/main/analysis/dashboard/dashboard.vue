<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <template v-for="item in amountList" :key="item.amount">
        <el-col :span="6">
          <count-card :item="item" />
        </el-col>
      </template>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="7">
        <chart-card />
      </el-col>
      <el-col :span="10">
        <chart-card />
      </el-col>
      <el-col :span="7">
        <chart-card />
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="12">
        <chart-card />
      </el-col>
      <el-col :span="12">
        <chart-card />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="dashboard">
import useAnalysisStore from '@/store/main/analysis/analysis'
import { storeToRefs } from 'pinia'
import CountCard from './c-cpns/count-card/CountCard.vue'
import ChartCard from './c-cpns/chart-card/ChartCard.vue'
import { computed } from 'vue'

// analysis相关数据只有dashboard页面自己使用 因此加载该页面时才有必要去加载相关数据
const analysisStore = useAnalysisStore()
analysisStore.loadAmountDataAction()

const { amountList, categoryCount, categorySale, addressSale } =
  storeToRefs(analysisStore)
const mapCategoryCount = computed(() => {
  return categoryCount.value.map((item) => ({
    name: item.name,
    value: item.goodsCount
  }))
})
const mapCategorySale = computed(() => {
  const labels = categorySale.value.map((item) => item.name)
  const values = categorySale.value.map((item) => item.goodsCount)
  return { labels, values }
})
const mapAddressSale = computed(() => {
  const labels = addressSale.value.map((item) => item.address)
  const values = addressSale.value.map((item) => item.count)
  return { labels, values }
})
</script>

<style scoped lang="less">
.dashboard {
  .el-row {
    margin-bottom: 10px;
  }
}
</style>
