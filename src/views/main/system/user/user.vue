<template>
  <div class="user">
    <page-search
      class="user-search"
      :searchConfig="searchConfig"
      @reset-click="handleResetClick"
      @query-click="handleQueryClick"
    />
    <page-content
      class="user-content"
      :contentConfig="contentConfig"
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    >
      <template #createAt="scope">
        ~{{ formatUTC(scope[scope.prop]) }}~
      </template>
      <template #updateAt="scope">
        ={{ formatUTC(scope[scope.prop]) }}=
      </template>
    </page-content>
    <page-modal :modalConfig="modalConfig" ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="user">
import { searchConfig } from './config/search.config'
import { modalConfig } from './config/modal.config'
import { contentConfig } from './config/content.config'
import { formatUTC } from '@/utils/format'
import { ref } from 'vue'
import type PageContent from '@/components/page-content/PageContent.vue'
import type PageModal from '@/components/page-modal/PageModal.vue'

const contentRef = ref<InstanceType<typeof PageContent>>()
// 一进入user页面就加载content列表(绑定ref后立马访问这样很可能访问为空 应该通过nextTick保证页面挂载完毕(包括ref绑定完成)后再去访问ref才行)
// 但这么做以后 每次新增一个页面都需要重新编写列表加载语句 干脆将列表加载语句放入page-content中
// nextTick(() => {
//   contentRef.value?.loadPageList()
// })
const modalRef = ref<InstanceType<typeof PageModal>>()

function handleResetClick() {
  contentRef.value?.loadPageList()
}
function handleQueryClick(formItems: any) {
  contentRef.value?.loadPageList(formItems)
}
function handleNewClick() {
  modalRef.value?.setModalVisible()
}
function handleEditClick(pageItem: any) {
  modalRef.value?.setModalVisible(false, pageItem)
}
</script>

<style scoped lang="less">
.user {
  border-radius: 8px;
  overflow: hidden;

  .user-search {
    background-color: #fff;
  }

  .user-content {
    background-color: #fff;
  }
}
</style>
