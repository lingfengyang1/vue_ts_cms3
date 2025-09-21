import { createApp } from 'vue'
import App from './App.vue'
// 重置样式
import 'normalize.css'
import '@/assets/css/reset.css'
import router from './router'
// import { createPinia } from 'pinia'
import { registerStore } from './global/register-store'
import { registerIcons } from '@/global/register-icons'

/**
 * 依赖查找顺序:
 * 1.导入导出语句:先逐级查找每一层目录下node_modules中的模块文件 如果找不到 就查找环境变量NODE_PATH配置的模块文件
 * 2.package.json/手动输入的npx命令:先查找项目根目录下node_modules/.bin中的可执行文件 如果找不到 就查找环境变量PATH配置的可执行文件
 * 3.手动输入的不带有npx的命令:直接查找环境变量PATH中配置的可执行文件
 *
 * editorconfig:
 * 统一多人开发中不同的编码风格
 * prettierrc:
 * 定义一套代码风格
 * prettierignore:
 * prettier风格忽略的文件
 * eslint.config.js:
 * 使用不同的规范对代码进行不同程度的提示、可以结合prettier规范来检查代码规范(prettier报错效果的显示需要我们安装eslint中的依赖 npm i指令只能够安装package.json中的依赖)
 */

const app = createApp(App)
// app在调用传入函数时 会传入app调用者本身
app.use(registerIcons)
// app.use(createPinia())
app.use(registerStore)
app.use(router)
app.mount('#app')
