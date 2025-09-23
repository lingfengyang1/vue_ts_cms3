<template>
  <div class="map-chart">
    <base-chart :option="option" />
  </div>
</template>

<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { convertData } from '../../utils/convert-data'
import BaseChart from '../base-chart/BaseChart.vue'
const prop = defineProps<{
  data: any[]
}>()
const option = computed(() => ({
  title: {
    text: '全国销量统计',
    textStyle: {
      color: '#f00',
      x: 'center',
      y: 'top'
    }
  },
  tooltip: {
    trigger: 'item',
    formatter: (item: any) => item.name + ':' + item.value[2]
  },
  geo: {
    map: 'china',
    // 控制item悬浮时的样式
    emphasis: {
      itemStyle: {
        borderColor: '#f00',
        areaColor: '#0f0'
      }
    }
  },
  series: [
    // 负责绘制散点
    {
      map: 'china',
      // 该类型默认采用的是直角坐标系 而我们所要采用的是地图坐标系
      type: 'scatter',
      coordinateSystem: 'geo',
      data: convertData(prop.data),
      // 控制散点的大小
      symbolSize: 12
    },
    // 负责绘制地图
    {
      type: 'map',
      map: 'china',
      // 采用的是第一个geo
      geoIndex: 0,
      // 每一个省份没有提示 但每一个散点有提示
      tooltip: {
        show: false
      }
    }
  ],
  visualMap: {
    min: 0,
    max: 60000,
    calculable: true,
    text: ['高', '低'],
    inRange: {
      color: ['rgb(70, 240, 252)', 'rgb(250, 220, 46)', 'rgb(245, 38, 186)']
    },
    textStyle: {
      color: '#f00'
    },
    left: 20,
    bottom: 20
  }
}))
</script>

<style scoped lang="less">
.map-chart {
  color: red;
}
</style>
