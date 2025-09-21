<template>
  <div class="menu">
    <page-content
      class="menu-content"
      :content-config="contentConfig"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    />
  </div>
</template>

<script setup lang="ts" name="menu">
import PageContent from '@/components/page-content/PageContent.vue'
import { contentConfig } from './config/content.config'

function handleNewClick() {}
function handleEditClick() {}
</script>

<style scoped lang="less">
.menu {
  border-radius: 8px;
  overflow: hidden;
  .menu-content {
    background-color: #fff;
  }
}
</style>
