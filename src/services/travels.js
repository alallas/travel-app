import request from '@/utils/request.js'

// 获取瀑布流数据
export function getWaterFallList(page, keyword='') {
  return request.get(
    `/travels/getTravels`,
    {
      page,
      keyword
    }
  )
}

// 获取游记详情
export function getTravelDetail(id) {
  return request.get(
    `/travels/detail/${id}`,
  )
}

