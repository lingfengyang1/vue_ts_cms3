<template>
  <div class="pie-chart">
    <base-chart :option="option" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseChart from '../base-chart/BaseChart.vue'

const prop = defineProps<{
  data: any[]
}>()
const option = computed(() => ({
  // 图例
  legend: {
    // 图例元素的排列方向
    orient: 'horizontal',
    // 图例的对齐方式
    x: 'left',
    y: 'top'
  },
  // 饼图每一个item的提示
  tooltip: {
    // 提示触发载体
    trigger: 'item'
  },
  // 饼图信息
  series: {
    // 饼图半径 百分值是相对于宽高的最小值进行计算的
    radius: '50%',
    name: '访问来源',
    type: 'pie',
    data: prop.data
  }
}))
</script>

<style scoped lang="less">
.pie-chart {
  .container {
    height: 300px;
  }
}
</style>
