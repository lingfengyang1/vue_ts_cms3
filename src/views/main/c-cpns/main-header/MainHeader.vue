<template>
  <div class="main-header">
    <div class="left">
      <el-icon size="28px" @click="handleIconClick">
        <component :is="isFold ? 'Expand' : 'Fold'" />
      </el-icon>
      <el-breadcrumb :separator-icon="CaretRight">
        <template v-for="breadCrumb in breadCrumbs" :key="breadCrumb.name">
          <el-breadcrumb-item :to="breadCrumb.url">
            {{ breadCrumb.name }}
          </el-breadcrumb-item>
        </template>
      </el-breadcrumb>
    </div>
    <div class="right">
      <div class="operations">
        <span class="operation">
          <el-icon size="20px"><Message /></el-icon>
        </span>
        <span class="operation">
          <el-icon size="20px"><ChatDotRound /></el-icon>
        </span>
        <span class="operation">
          <el-icon size="20px"><Search /></el-icon>
        </span>
      </div>
      <el-dropdown class="el-dropdown">
        <div class="info">
          <el-avatar
            :size="30"
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleExitClick">
              <el-icon><CircleClose /></el-icon>
              <span>退出系统</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><InfoFilled /></el-icon>
              <span>个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><Unlock /></el-icon>
              <span>修改密码</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
// 不能够写明具体的./dist/types子目录 因为这样会报错 省略该子目录后 ts就会自动根据package.json中配置的type字段来找到./dist/types子目录
import { TOKEN } from '@/global/constants'
import router from '@/router'
import useLoginStore from '@/store/login/login'
import { localCache } from '@/utils/cache'
import { mapPathToBreadCrumbs, resetFirstMenu } from '@/utils/mapper'
import { CaretRight } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const isFold = ref<boolean>(false)
const emit = defineEmits(['iconClick'])
const loginStore = useLoginStore()
const { userInfo, userMenus } = storeToRefs(loginStore)
const route = useRoute()
const breadCrumbs = computed(() => {
  return mapPathToBreadCrumbs(userMenus.value, route.path)
})

function handleIconClick() {
  isFold.value = !isFold.value

  emit('iconClick', isFold.value)
}
function handleExitClick() {
  localCache.removeCache(TOKEN)

  // 退出登录后需要删除动态注册的所有路由
  router.removeRoute('main')
  router.addRoute({
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/Main.vue')
  })

  // 退出登录后需要重置firstMenu 否则会残留给下一个用户(重新登录时 只不过是重新执行了mapper模块中的mapMenuToRouter函数 并没有波及到整个模块的重新加载 因此模块中的firstMenu并没有得以重置)
  resetFirstMenu()

  router.push('/login')
}
</script>

<style scoped lang="less">
.main-header {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .left {
    display: flex;
    align-items: center;

    .el-breadcrumb {
      padding-left: 18px;
    }
  }

  .right {
    padding-right: 18px;
    display: flex;
    align-items: center;

    .operations {
      margin-right: 20px;
      display: flex;

      .operation {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 35px;

        &:hover {
          background-color: #f2f2f2;
        }
      }
    }

    .el-dropdown {
      .info {
        display: flex;
        align-items: center;
        justify-content: center;
        .name {
          margin-left: 5px;
          font-size: 14px;
          color: #606266;
        }
      }

      // 该样式的作用范围是全局(.el-dropdown-menu__item这个选择器不位于#app内部 而是位于其外部 我们在这里面设置相当于在#app内部为.el-dropdown-menu__item设置样式 结果肯定无效)
      :global(.el-dropdown-menu__item) {
        padding: 6px 22px;
        height: 36px;
      }

      // 不能够在:global选择器中直接编写&:first-child 因为这样最终编译后的结果只能是.el-dropdown-menu__item:first-child而非:global(.el-dropdown-menu__item:first-child)
      :global(.el-dropdown-menu__item:first-child) {
        border-bottom: 1px solid #eee;
      }

      // :deep的作用是为第三方组件内部的子元素设置样式
      :deep(.el-tooltip__trigger:focus-visible) {
        // 消除dropdown悬浮或者点击时的黑色边框
        outline: unset;
      }
    }
  }
}
</style>
