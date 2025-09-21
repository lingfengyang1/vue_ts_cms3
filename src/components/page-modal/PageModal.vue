<template>
  <div class="page-modal">
    <el-dialog
      width="33.33%"
      :title="isNewRef ? '新建用户' : '编辑用户'"
      v-model="modalVisible"
    >
      <el-form :model="formItems" label-width="80px" size="large">
        <template v-for="item in prop.modalConfig.list" :key="item.prop">
          <!-- 只有编辑页面中的密码字段才不展示 新增页面的所有字段以及编辑页面的剩余字段统统都会展示 我们是通过编辑页面的密码字段的对立面来作为显式条件的 -->
          <el-form-item
            :label="item.label"
            :prop="item.prop"
            v-show="!(!isNewRef && item.type === 'password')"
          >
            <template v-if="item.type === 'input'">
              <el-input
                v-model="formItems[item.prop]"
                :placeholder="item.placeholder"
              />
            </template>
            <template v-if="item.type === 'tree'">
              <slot :name="item.prop"></slot>
            </template>
            <template v-if="item.type === 'password'">
              <el-input
                v-model="formItems[item.prop]"
                :placeholder="item.placeholder"
              />
            </template>
            <template v-if="item.type === 'select'">
              <el-select
                :label="item.label"
                :prop="item.prop"
                v-model="formItems[item.prop]"
              >
                <template v-for="option in item.options.value" :key="option.id">
                  <el-option :label="option.name" :value="option.id" />
                </template>
              </el-select>
            </template>
          </el-form-item>
        </template>
      </el-form>
      <template #footer>
        <div class="btns">
          <el-button @click="handleCancelClick">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import useMainStore from '@/store/main/main'
import { useSystemStore } from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'

const prop = defineProps<{
  modalConfig: {
    pageName: string
    list: any[]
  }
  checkedKeys: any[]
}>()
const modalVisible = ref<boolean>(false)
const formItems = reactive<any>({})
const mainStore = useMainStore()
const systemStore = useSystemStore()
const isNewRef = ref<boolean>(true)
const currentPageItem = reactive<any>({})
const { entireRoles, entireDepartments } = storeToRefs(mainStore)
for (const item of prop.modalConfig.list) {
  formItems[item.prop] = ''
  if (item.prop === 'roleId') item.options = entireRoles
  if (item.prop === 'departmentId' || item.prop === 'parentId')
    item.options = entireDepartments
}

function handleCancelClick() {
  modalVisible.value = false
}
function handleConfirmClick() {
  if (isNewRef.value) {
    systemStore.newPageAction(prop.modalConfig.pageName, {
      ...formItems,
      menuList: prop.checkedKeys
    })
  } else {
    console.log(formItems)
    console.log(prop.checkedKeys)
    systemStore.editPageAction(
      prop.modalConfig.pageName,
      currentPageItem.value.id,
      { ...formItems, menuList: prop.checkedKeys }
    )
  }
  modalVisible.value = false
}
function setModalVisible(isNew: boolean = true, pageItem?: any) {
  modalVisible.value = true

  isNewRef.value = isNew

  if (isNew) {
    for (const key in formItems) {
      // if (key === 'menuList') {
      // 请注意 该函数有可能先于modal页面渲染完成之前执行 因此会执行失败 为了保证在渲染完毕后执行 我们需要借助nextTick
      // 请注意nextTick只会在当前组件渲染完毕后执行 注意是当前组件 如果所在子组件暴露的方法是由父组件调用的话 那么nextTick保证的是父组件的渲染完毕而非子组件
      //   nextTick(() => {
      //     treeRef.value?.setCheckedKeys([])
      //   })
      //   continue
      // }
      formItems[key] = ''
    }
  } else {
    for (const key in formItems) {
      formItems[key] = pageItem[key]
    }
    // 需要记录一下当前编辑的这条记录 后续需要用到这条记录的id数据
    currentPageItem.value = pageItem
  }
}
defineExpose({
  setModalVisible
})
</script>

<style scoped lang="less">
.page-modal {
  :deep(.el-dialog__header) {
    padding: 20px 20px 10px;
    margin-right: 16px;
    text-align: center;
  }
  :deep(.el-dialog) {
    padding: 0;
  }
  :deep(.el-dialog__body) {
    padding: 25px 25px 30px;
    .el-form {
      padding: 0 20px;
    }
  }
  :deep(.el-dialog__footer) {
    padding: 10px 20px 20px;
    text-align: center;
  }
}
</style>
