import { hyRequest2 } from '@/service'

function postPageList(pageName: string, pageInfo: any) {
  return hyRequest2.post({
    url: `/${pageName}/list`,
    data: pageInfo,
    headers: {}
  })
}
function postNewPage(pageName: string, pageInfo: any) {
  return hyRequest2.post({
    url: `/${pageName}`,
    data: pageInfo,
    headers: {}
  })
}
function patchEditPage(pageName: string, id: number, pageInfo: any) {
  console.log(pageInfo)
  return hyRequest2.patch({
    url: `/${pageName}/${id}`,
    data: pageInfo,
    headers: {}
  })
}
function deleteDeletePage(pageName: string, id: number) {
  return hyRequest2.delete({
    url: `/${pageName}/${id}`,
    headers: {}
  })
}

export { postPageList, postNewPage, patchEditPage, deleteDeletePage }
