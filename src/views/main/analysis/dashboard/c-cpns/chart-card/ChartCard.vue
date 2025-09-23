<template>
  <div class="chart-card">
    <el-card>
      <template #header>
        <span>卡片的头部标题</span>
      </template>
      <span>
        <slot name="chart"></slot>
      </span>
    </el-card>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.chart-card {
  color: #303133;
}
</style>
