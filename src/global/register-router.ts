import type { RouteRecordRaw } from 'vue-router'

// 动态注册路由 防止每一个用户都注册所有路由、从而能够绕过页面所展示的路由访问他所不允许访问的路由
function registerRouter() {
  const routes: RouteRecordRaw[] = []

  // 扫描路由文件(需要注意的是：我们要立即加载模块文件 否则默认情况是用到时才加载模块文件 这样就无法获取到指定模块文件中的内容了)
  const files: Record<string, any> = import.meta.glob(
    '../router/main/**/*.ts',
    { eager: true }
  )

  for (const key in files) {
    routes.push(files[key].default)
  }

  return routes
}

export { registerRouter }
