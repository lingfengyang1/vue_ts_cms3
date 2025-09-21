import type { IAccount } from '@/types'
import { hyRequest2 } from '..'

function postAccountLogin(account: IAccount) {
  return hyRequest2.post({
    url: '/login',
    data: account,
    headers: {}
  })
}

function getUserInfo(id: number) {
  return hyRequest2.get({
    url: `/users/${id}`,
    headers: {}
  })
}

function getUserMenus(roleId: number) {
  return hyRequest2.get({
    url: `/role/${roleId}/menu`,
    headers: {}
  })
}

export { postAccountLogin, getUserInfo, getUserMenus }
