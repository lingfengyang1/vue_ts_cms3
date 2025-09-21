<template>
  <div class="panel-account">
    <el-form
      :model="formItems"
      label-width="60px"
      :rules="rules"
      status-icon
      size="large"
      ref="formRef"
    >
      <el-form-item label="帐号" prop="name">
        <el-input v-model="formItems.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formItems.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/store/login/login'
import { localCache } from '@/utils/cache'
import { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { CHECKED_STATUS, NAME, PASSWORD } from '../../../constants'

const router = useRouter()
const formRef = ref<InstanceType<typeof ElForm>>()
const formItems = reactive({
  name: localCache.getCache(NAME) ?? '',
  password: localCache.getCache(PASSWORD) ?? ''
})
const rules = {
  name: {
    required: true,
    message: '用户名不能为空',
    trigger: 'blur'
  },
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur'
    },
    {
      pattern: /^[a-zA-Z0-9]{6,20}$/,
      message: '密码必须是6-20位的数字或者字母',
      trigger: 'blur'
    }
  ]
}
const loginStore = useLoginStore()
defineExpose({
  panelAccountLoginClick
})

function panelAccountLoginClick() {
  // loginStore.accountLoginAction(formItems)
  // 确保校验通过后才进行登录
  formRef.value.validate((isValidated) => {
    if (isValidated) {
      // 登录有可能会失败 因此保证了登录成功后才去保存用户名和密码信息
      loginStore.accountLoginAction(formItems).then((res) => {
        // 判断是否保存密码
        const checkedStatus = localCache.getCache(CHECKED_STATUS)
        const { name, password } = formItems
        if (checkedStatus) {
          localCache.setCache(NAME, name)
          localCache.setCache(PASSWORD, password)
        } else {
          localCache.removeCache(NAME)
          localCache.removeCache(PASSWORD)
        }
      })
    } else {
      router.push('/login')
    }
  })
}
</script>

<style scoped lang="less">
.panel-account {
  padding: 15px;
  .el-form {
    font-size: 14px;
    color: #606266;
  }
}
</style>
