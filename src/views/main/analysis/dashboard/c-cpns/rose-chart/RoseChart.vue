<template>
  <div class="rose-chart">
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
  toolbox: {
    show: true,
    feature: {
      dataView: {
        show: true
      },
      restore: {
        show: true
      },
      saveAsImage: {
        show: true
      }
    }
  },
  tooltip: {
    trigger: 'item'
  },
  series: {
    radius: ['5%', '80%'],
    name: '访问来源',
    type: 'pie',
    // roseType为area时 值为0的扇形item仍然可见 但如果为radius时 那么就会彻底不可见
    roseType: 'area',
    data: prop.data,
    itemStyle: {
      borderRadius: 5
    },
    label: {
      show: false
    }
  }
}))
</script>

<style scoped lang="less">
.rose-chart {
  .container {
    height: 300px;
  }
}
</style>
