<template>
  <div class="bar-chart">
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
    // 控制x轴上的字段在柱状图内部展示
    axisLabel: {
      inside: true,
      // 字段文本以该颜色显示
      color: '#fff'
    },
    // x轴字段在柱状图之上展示
    z: 10
  },
  yAxis: {
    type: 'value'
  },
  series: {
    type: 'bar',
    data: prop.data.values,
    showBackground: true,
    backgroundStyle: {
      color: 'rgba(180, 180, 180, 0.2)'
    }
  },
  title: {
    text: '支持鼠标滚动缩放',
    x: 'left',
    y: 'top'
  }
}))
</script>

<style scoped>
.bar-chart {
  color: red;
}
</style>
