<template>
  <div class="line-chart">
    <base-chart :option="option" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseChart from '../base-chart/BaseChart.vue'
const prop = defineProps<{
  data: any
}>()
const option = computed(() => ({
  xAxis: {
    type: 'category',
    data: prop.data.labels,
    // 控制x轴两端是否存在空隙
    boundaryGap: false
  },
  yAxis: {
    type: 'value'
  },
  series: {
    name: '分类销量统计',
    type: 'line',
    data: prop.data.values,
    // 可以控制折线图面积的可见性
    areaStyle: {}
  },
  tooltip: {
    trigger: 'axis'
  },
  // 控制图例的位置
  legend: {
    x: 'center',
    y: 'top'
  }
}))
</script>

<style scoped>
.line-chart {
  color: red;
}
</style>
