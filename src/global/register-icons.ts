import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import type { App } from 'vue'

// 图标则通过全局注册的方式(因为自动导入不适合和component动态组件一起使用 原因在于自动导入只会在编译阶段将静态组件注册到局部注册表中 而运行阶段时的动态组件就无法从注册表中获取到指定的组件了)
function registerIcons(app: App<Element>) {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}

export { registerIcons }
