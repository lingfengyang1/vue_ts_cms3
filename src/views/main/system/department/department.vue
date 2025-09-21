<template>
  <div class="department">
    <page-search
      class="department-search"
      :search-config="searchConfig"
      @reset-click="handleResetClick"
      @query-click="handleQueryClick"
    />
    <page-content
      class="department-content"
      :content-config="contentConfig"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
      ref="contentRef"
    >
      <template #parentId="scope">
        {{
          entireDepartments.find((item) => item.id === scope[scope.prop])?.name
        }}
      </template>
      <template #createAt="scope">{{ formatUTC(scope[scope.prop]) }}</template>
      <template #updateAt="scope">{{ formatUTC(scope[scope.prop]) }}</template>
    </page-content>
    <page-modal :modal-config="modalConfig" ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="department">
import PageSearch from '@/components/page-search/PageSearch.vue'
import PageContent from '@/components/page-content/PageContent.vue'
import PageModal from '@/components/page-modal/PageModal.vue'
import { searchConfig } from './config/search.config'
import { contentConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'
import { ref } from 'vue'
import { formatUTC } from '@/utils/format'
import { storeToRefs } from 'pinia'
import useMainStore from '@/store/main/main'
const contentRef = ref<InstanceType<typeof PageContent>>()
const modalRef = ref<InstanceType<typeof PageModal>>()
const mainStore = useMainStore()
const { entireDepartments } = storeToRefs(mainStore)

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
.department {
  border-radius: 8px;
  overflow: hidden;
  .department-search {
    background-color: #fff;
  }
  .department-content {
    background-color: #fff;
  }
}
</style>
