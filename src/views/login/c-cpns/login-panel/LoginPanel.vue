<template>
  <div class="login-panel">
    <h1 class="login-title">后台管理系统</h1>
    <el-tabs type="border-card" stretch>
      <el-tab-pane>
        <template #label>
          <span>
            <el-icon><UserFilled /></el-icon>
            <span>帐号登录</span>
          </span>
        </template>
        <panel-account ref="panelAccountRef" />
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span>
            <el-icon><Cellphone /></el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <panel-phone />
      </el-tab-pane>
    </el-tabs>
    <div class="login-options">
      <el-checkbox
        v-model="isChecked"
        label="记住密码"
        @change="handleCheckedStatusChangeClick"
      />
      <el-link class="forget-btn" type="primary">忘记密码</el-link>
    </div>
    <el-button
      class="login-btn"
      type="primary"
      size="large"
      @click="handleLoginClick"
    >
      立即登录
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PanelAccount from './c-cpns/panel-account/PanelAccout.vue'
import PanelPhone from './c-cpns/panel-phone/PanelPhone.vue'
import { localCache } from '@/utils/cache'
import { CHECKED_STATUS } from '../constants'

const isChecked = ref<boolean>(localCache.getCache(CHECKED_STATUS) ?? false)
const panelAccountRef = ref<InstanceType<typeof PanelAccount>>()

function handleLoginClick() {
  panelAccountRef.value.panelAccountLoginClick()
}
function handleCheckedStatusChangeClick(isChecked: boolean) {
  // 默认接收勾选状态变量
  localCache.setCache(CHECKED_STATUS, isChecked)
}
</script>

<style scoped lang="less">
.login-panel {
  color: purple;
  width: 330px;
  // 水平居中
  margin: 0 auto;
  // 垂直居中
  position: relative;
  top: 50%;
  transform: translateY(-50%);

  .login-title {
    margin: 0 0 15px;
    // 水平居中效果
    text-align: center;
  }

  .login-options {
    margin: 12px 0 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .forget-btn {
      height: 40px;
    }
  }

  .login-btn {
    margin: 10px 0 0;
    width: 100%;
  }
}
</style>
