<template>
  <div class="main-aside">
    <div class="header">
      <img class="logo" src="@/assets/img/logo.svg" alt="" />
      <span class="title">后台管理系统</span>
    </div>
    <el-menu
      background-color="#001529"
      text-color="#b7bdc3"
      active-text-color="#fff"
      :default-active="pathMenu.id + ''"
      :collapse="prop.isCollapse"
    >
      <template v-for="userMenu in userMenus" :key="userMenu.id">
        <!-- el-sub-menu和el-menu-item都需要绑定index属性 这样el-menu在查找激活菜单时才能够找到 -->
        <el-sub-menu :index="String(userMenu.id)">
          <template #title>
            <el-icon>
              <component :is="userMenu.icon.split('-icon-')[1]" />
            </el-icon>
            <span>{{ userMenu.name }}</span>
          </template>
          <template
            v-for="subUserMenu in userMenu.children"
            :key="subUserMenu.id"
          >
            <el-menu-item
              :index="String(subUserMenu.id)"
              @click="handleMenuItemClick(subUserMenu.url)"
            >
              <span>{{ subUserMenu.name }}</span>
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/store/login/login'
import { mapPathToMenu } from '@/utils/mapper'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const loginStore = useLoginStore()
const userMenus = loginStore.userMenus
const prop = defineProps({
  isCollapse: {
    type: Boolean,
    value: false
  }
})
const router = useRouter()
const route = useRoute()
const pathMenu = computed(() => {
  return mapPathToMenu(userMenus, route.path)
})

function handleMenuItemClick(url: string) {
  router.push(url)
}
</script>

<style scoped lang="less">
.main-aside {
  .header {
    padding: 12px 10px 8px;
    display: flex;
    align-items: center;
    .logo {
      width: 28px;
      margin: 0 10px;
    }
    .title {
      font-weight: bold;
      color: #fff;
      // 在折叠展开的过程中始终保证一行展示 这样不会造成折叠时多行展示的现象
      white-space: nowrap;
      // 对于溢出的部分用隐藏
      overflow: hidden;
    }
  }

  .el-menu {
    border: none;
    .el-menu-item {
      padding-left: 50px;
    }

    .el-menu-item:hover {
      color: #fff;
    }

    .el-menu-item.is-active {
      background-color: #0a60bd;
    }
  }
}
</style>
