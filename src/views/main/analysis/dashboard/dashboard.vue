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
        <chart-card>
          <template #chart>
            <pie-chart :data="mapCategoryCount" />
          </template>
        </chart-card>
      </el-col>
      <el-col :span="10">
        <chart-card>
          <template #chart>
            <map-chart :data="mapAddressSale" />
          </template>
        </chart-card>
      </el-col>
      <el-col :span="7">
        <chart-card>
          <template #chart>
            <rose-chart :data="mapCategoryCount" />
          </template>
        </chart-card>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="12">
        <chart-card>
          <template #chart>
            <line-chart :data="mapCategorySale" />
          </template>
        </chart-card>
      </el-col>
      <el-col :span="12">
        <chart-card>
          <template #chart>
            <bar-chart :data="mapCategoryFavor" />
          </template>
        </chart-card>
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
import PieChart from './c-cpns/pie-chart/PieChart.vue'
import RoseChart from './c-cpns/rose-chart/RoseChart.vue'
import LineChart from './c-cpns/line-chart/LineChart.vue'
import BarChart from './c-cpns/bar-chart/BarChart.vue'
import MapChart from './c-cpns/map-chart/MapChart.vue'

// analysis相关数据只有dashboard页面自己使用 因此加载该页面时才有必要去加载相关数据
const analysisStore = useAnalysisStore()
analysisStore.loadAmountDataAction()

const { amountList, categoryCount, categorySale, categoryFavor, addressSale } =
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
const mapCategoryFavor = computed(() => {
  const labels = categoryFavor.value.map((item) => item.name)
  const values = categoryFavor.value.map((item) => item.goodsFavor)
  return { labels, values }
})
const mapAddressSale = computed(() => {
  return addressSale.value.map((item) => ({
    name: item.address,
    value: item.count
  }))
})
console.log(mapAddressSale)
</script>

<style scoped lang="less">
.dashboard {
  .el-row {
    margin-bottom: 10px;
  }
}
</style>
