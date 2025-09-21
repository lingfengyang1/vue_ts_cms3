import { hyRequest2 } from '..'

function postEntireRoles() {
  return hyRequest2.post({
    url: '/role/list',
    headers: {}
  })
}

function postEntireDepartments() {
  return hyRequest2.post({
    url: '/department/list',
    headers: {}
  })
}

function postMenuList() {
  return hyRequest2.post({
    url: '/menu/list',
    headers: {}
  })
}

export { postEntireRoles, postEntireDepartments, postMenuList }
