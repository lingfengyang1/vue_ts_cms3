import { hyRequest2 } from '@/service'

function getAmountList() {
  return hyRequest2.get({
    url: '/goods/amount/list',
    headers: {}
  })
}

function getCategoryCount() {
  return hyRequest2.get({
    url: '/goods/category/count',
    headers: {}
  })
}

function getCategorySale() {
  return hyRequest2.get({
    url: '/goods/category/sale',
    headers: {}
  })
}

function getAddressSale() {
  return hyRequest2.get({
    url: '/goods/address/sale',
    headers: {}
  })
}

export { getAmountList, getCategoryCount, getCategorySale, getAddressSale }
