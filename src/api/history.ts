import request from '@/util/request'

export function getHistoryApi(data = {}) {
  return request.get('/history/query', data, { mock: false })
}

export function checkHistoryApi(data = {}) {
  return request.get('/history/check', data, { mock: false })
}
