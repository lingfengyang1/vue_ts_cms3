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
      if (!userRoutes.find((item) => item.path === userMenu.url)) {
        userRoutes.push({ path: userMenu.url, redirect: subUserMenu.url })
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

function mapPathToBreadCrumbs(userMenus: any[], path: string) {
  const breadCrumbs: any[] = []
  for (const userMenu of userMenus) {
    for (const subUserMenu of userMenu.children) {
      if (path === subUserMenu.url) {
        breadCrumbs.push({ name: userMenu.name, url: userMenu.url })
        breadCrumbs.push({ name: subUserMenu.name, url: subUserMenu.url })
      }
    }
  }
  return breadCrumbs
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
  mapCheckedMenusToIds,
  mapPathToBreadCrumbs
}
