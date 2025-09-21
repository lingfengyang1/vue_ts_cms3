<template>
  <div class="main">
    <el-container>
      <el-aside :width="isCollapse ? '58px' : '210px'">
        <main-aside :isCollapse="isCollapse" />
      </el-aside>
      <el-container>
        <el-header>
          <main-header @icon-click="handleIconClick" />
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MainAside from './c-cpns/main-aside/MainAside.vue'
import MainHeader from './c-cpns/main-header/MainHeader.vue'

const isCollapse = ref<boolean>(false)

function handleIconClick(isFold: boolean) {
  isCollapse.value = isFold
}
</script>

<style scoped lang="less">
.main {
  background-color: #fff;
  height: 100vh;

  > .el-container {
    height: 100%;

    .el-aside {
      height: 100%;
      transition: width 0.3s ease;
      background-color: #001529;
      overflow: hidden;
    }

    .el-header {
      height: 50px;
    }

    .el-main {
      background-color: #f0f2f5;
    }
  }
}
</style>
