<template>
  <div class="role">
    <page-search
      class="role-search"
      :search-config="searchConfig"
      @reset-click="handleResetClick"
      @query-click="handleQueryClick"
    />
    <page-content
      class="role-content"
      ref="contentRef"
      :content-config="contentConfig"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    >
      <template #createAt="scope">{{ formatUTC(scope[scope.prop]) }}</template>
      <template #updateAt="scope">{{ formatUTC(scope[scope.prop]) }}</template>
    </page-content>
    <page-modal
      :modal-config="modalConfig"
      ref="modalRef"
      :checked-keys="checkedKeys"
    >
      <template #menuList>
        <el-tree
          :data="menuList"
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          show-checkbox
          @check="handleTreeNodeCheck"
          ref="treeRef"
        />
      </template>
    </page-modal>
  </div>
</template>

<script setup lang="ts" name="role">
import PageSearch from '@/components/page-search/PageSearch.vue'
import PageContent from '@/components/page-content/PageContent.vue'
import PageModal from '@/components/page-modal/PageModal.vue'
import { searchConfig } from './config/search.config'
import { contentConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'
import { formatUTC } from '@/utils/format'
import { nextTick, ref } from 'vue'
import type { ElTree } from 'element-plus'
import useMainStore from '@/store/main/main'
import { storeToRefs } from 'pinia'
import { mapCheckedMenusToIds } from '@/utils/mapper'
const contentRef = ref<InstanceType<typeof PageContent>>()
const modalRef = ref<InstanceType<typeof PageModal>>()
const treeRef = ref<InstanceType<typeof ElTree>>()
const mainStore = useMainStore()
const { menuList } = storeToRefs(mainStore)
// 传递给子组件的checked-keys需要为ref 原因在于prop对于let变量只是值拷贝 而对于ref则是引用拷贝、会根据ref值的变化而改变prop
const checkedKeys = ref<any[]>([])

function handleResetClick() {
  contentRef.value?.loadPageList()
}
function handleQueryClick(formItems: any) {
  contentRef.value?.loadPageList(formItems)
}
function handleNewClick() {
  nextTick(() => {
    treeRef.value?.setCheckedKeys([])
  })
  modalRef.value?.setModalVisible()
}
function handleEditClick(pageItem: any) {
  nextTick(() => {
    console.log(pageItem)
    // 表单提交时 面对menuList字段他会提交的是选中的对象集群 而非选中的对象key集群 所以在此设置时需要将对象转换成key
    treeRef.value?.setCheckedKeys(mapCheckedMenusToIds(pageItem.menuList))
  })
  modalRef.value?.setModalVisible(false, pageItem)
}
function handleTreeNodeCheck(data1: any, data2: any) {
  // 参数一表示选中节点在data数据中对应的对象 参数二表示选中对象相关信息(包含了选中对象数组、选中对象key数组、半选中对象数组、半选中对象key数组)
  // console.log(data1, data2)
  checkedKeys.value = [...data2.checkedKeys, ...data2.halfCheckedKeys]
}
</script>

<style scoped lang="less">
.role {
  border-radius: 8px;
  overflow: hidden;
  .role-search {
    background-color: #fff;
  }
  .role-content {
    background-color: #fff;
  }
}
</style>
