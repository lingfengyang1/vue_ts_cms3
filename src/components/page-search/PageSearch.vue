<template>
  <div class="page-search">
    <el-form :model="formItems" size="large" label-width="80px" ref="formRef">
      <el-row :gutter="20">
        <template v-for="item in prop.searchConfig.list" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  :placeholder="item.placeholder"
                  v-model="formItems[item.prop]"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-model="formItems[item.prop]"
                >
                  <template
                    v-for="option in prop.searchConfig.options"
                    :key="option.label"
                  >
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  v-model="formItems[item.prop]"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="btns">
      <el-button @click="handleResetClick">
        <el-icon><Refresh /></el-icon>
        <span>重置</span>
      </el-button>
      <el-button type="primary" @click="handleQueryClick">
        <el-icon><Search /></el-icon>
        <span>查询</span>
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'

interface ISearchConfig {
  pageName: string
  list: any[]
  options?: any[]
}
const prop = defineProps<{
  searchConfig: ISearchConfig
}>()
const formItems: any = reactive({})
for (const item of prop.searchConfig.list) {
  formItems[item.prop] = ''
}
const formRef = ref<InstanceType<typeof ElForm>>()
const emit = defineEmits(['reset-click', 'query-click'])

function handleResetClick() {
  formRef.value?.resetFields()

  emit('reset-click')
}
function handleQueryClick() {
  emit('query-click', formItems)
}
</script>

<style scoped lang="less">
.page-search {
  padding: 20px;

  .btns {
    padding: 0 50px 10px 0;
    display: flex;
    justify-content: flex-end;
  }

  .el-form-item {
    padding: 20px 30px;
    margin-bottom: 0;
  }
}
</style>
