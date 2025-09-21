import { registerRouter } from '@/global/register-router'
import type { RouteRecordRaw } from 'vue-router'

let firstMenu: any = null

function resetFirstMenu() {
  firstMenu = null
}

function mapMenuToRouter(userMenus: any[]) {
  const userRoutes: RouteRecordRaw[] = []
  const entireRoutes = registerRouter()
  for (const userMenu of userMenus) {
    for (const subUserMenu of userMenu.children) {
      const userRoute = entireRoutes.find(
        (item) => item.path === subUserMenu.url
      )
      if (userRoute) {
        userRoutes.push(userRoute)
      }
      if (userRoute && !firstMenu) {
        firstMenu = subUserMenu
      }
    }
  }
  return userRoutes
}

function mapPathToMenu(userMenus: any[], path: string) {
  let pathMenu: any = null
  for (const userMenu of userMenus) {
    for (const subUserMenu of userMenu.children) {
      if (path === subUserMenu.url) pathMenu = subUserMenu
    }
  }
  return pathMenu
}

function mapCheckedMenusToIds(checkedMenus: any[]) {
  const ids: number[] = []

  function recursiveGetIds(checkedMenus: any[]) {
    for (const checkedMenu of checkedMenus) {
      if (!checkedMenu.children) {
        ids.push(checkedMenu.id)
      } else {
        recursiveGetIds(checkedMenu.children)
      }
    }
  }
  recursiveGetIds(checkedMenus)

  return ids
}

export {
  firstMenu,
  resetFirstMenu,
  mapMenuToRouter,
  mapPathToMenu,
  mapCheckedMenusToIds
}
