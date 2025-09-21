<template>
  <div class="page-content">
    <div class="top">
      <h3 class="title">{{ prop.contentConfig.pageNameCn }}列表</h3>
      <el-button type="primary" @click="handleNewClick">
        新建{{ prop.contentConfig.pageNameCn }}
      </el-button>
    </div>
    <div class="table">
      <el-table :data="pageList" border row-key="id">
        <template v-for="item in prop.contentConfig.list" :key="item.prop">
          <template v-if="item.type === 'select'">
            <el-table-column type="selection" />
          </template>
          <template v-if="item.type === 'index'">
            <el-table-column
              type="index"
              :width="item.width"
              :label="item.label"
            />
          </template>
          <template v-if="item.type === 'normal' && item.prop !== 'parentId'">
            <el-table-column
              :width="item.width"
              :label="item.label"
              :prop="item.prop"
            />
          </template>
          <template v-if="item.type === 'normal' && item.prop === 'parentId'">
            <el-table-column
              :width="item.width"
              :label="item.label"
              :prop="item.prop"
            >
              <template #default="scope">
                <slot :name="item.prop" v-bind="scope.row" :prop="item.prop">
                </slot>
              </template>
            </el-table-column>
          </template>
          <template v-if="item.type === 'icon'">
            <el-table-column
              :width="item.width"
              :label="item.label"
              :prop="item.prop"
            >
              <template #default="scope">
                <el-icon>
                  <component :is="scope.row.icon?.split('-icon-')[1]" />
                </el-icon>
              </template>
            </el-table-column>
          </template>
          <template v-if="item.type === 'status'">
            <el-table-column
              :width="item.width"
              :label="item.label"
              :prop="item.prop"
            >
              <template #default="scope">
                <el-button
                  :type="scope.row.enable === 1 ? 'primary' : 'danger'"
                  plain
                  size="small"
                >
                  {{ scope.row.enable === 1 ? '启用' : '禁用' }}
                </el-button>
              </template>
            </el-table-column>
          </template>
          <template v-if="item.type === 'date'">
            <el-table-column
              :width="item.width"
              :label="item.label"
              :prop="item.prop"
            >
              <template #default="scope">
                <slot :name="item.prop" v-bind="scope.row" :prop="item.prop">
                </slot>
              </template>
            </el-table-column>
          </template>
          <template v-if="item.type === 'handler'">
            <el-table-column :width="item.width" :label="item.label">
              <template #default="scope">
                <el-button
                  type="primary"
                  text
                  :icon="Edit"
                  @click="handleEditClick(scope.row)"
                >
                  编辑
                </el-button>
                <el-button
                  type="danger"
                  text
                  :icon="Delete"
                  @click="handleRemoveClick(scope.row.id)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </template>
        </template>
      </el-table>
    </div>
    <div class="footer">
      <el-pagination
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        v-model:current-page="currentPage"
        :total="totalSize"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSystemStore } from '@/store/main/system/system'
import { Delete, Edit } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const prop = defineProps<{
  contentConfig: {
    pageName: string
    pageNameCn: string
    list: any[]
  }
}>()
const systemStore = useSystemStore()
// storeToRefs函数会根据store数据源的变化从而改变结果ref
const { pageCount, pageList } = storeToRefs(systemStore)
const pageSize = ref<number>(10)
const currentPage = ref<number>(1)
// 这种写法只是将pageCount这个ref对象的值拷贝给新的totalSize这个ref对象而已 如果真正要做到pageCount这个ref对象的值发生改变时totalCount这个ref对象也能够随之变化的话 那么就需要让ref函数直接绑定其他的ref对象而非其他ref对象的值 这样二者就会共用同一个ref对象了
const totalSize = ref(pageCount)
// 加载列表数据
loadPageList()
const emit = defineEmits(['new-click', 'edit-click'])

function loadPageList(queryInfo: any = {}) {
  let pageInfo = {
    offset: (currentPage.value - 1) * pageSize.value,
    size: pageSize.value
  }
  pageInfo = { ...pageInfo, ...queryInfo }
  systemStore.loadPageListAction(prop.contentConfig.pageName, pageInfo)
}
function handleCurrentChange() {
  loadPageList()
}
function handleSizeChange() {
  loadPageList()
}
function handleNewClick() {
  emit('new-click')
}
function handleEditClick(pageItem: any) {
  console.log(pageItem)
  emit('edit-click', pageItem)
}
function handleRemoveClick(id: number) {
  systemStore.deletePageAction(prop.contentConfig.pageName, id)
}
defineExpose({
  loadPageList
})
</script>

<style scoped lang="less">
.page-content {
  margin-top: 20px;
  padding: 20px;

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 22px;
    margin-bottom: 10px;
  }

  :deep(.el-table__cell) {
    text-align: center;
  }

  .el-pagination {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;

    :deep(.el-select__wrapper) {
      text-align: center;
    }
  }
}
</style>
