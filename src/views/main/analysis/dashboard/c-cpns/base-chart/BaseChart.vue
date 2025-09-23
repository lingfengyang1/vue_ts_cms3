<template>
  <div class="base-chart">
    <div class="container" ref="containerRef"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import * as echarts from 'echarts'
import ChinaJson from '../../data/china.json'

const prop = defineProps<{
  option: any
}>()
const containerRef = ref()
// 注册中国地图数据
echarts.registerMap('china', ChinaJson as any)
onMounted(() => {
  const instance = echarts.init(containerRef.value, 'light', {
    renderer: 'canvas'
  })
  watchEffect(() => {
    instance.setOption(prop.option)
  })
  window.addEventListener('resize', () => {
    instance.resize()
  })
})
</script>

<style scoped lang="less">
.base-chart {
  .container {
    height: 300px;
  }
}
</style>
