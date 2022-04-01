import request from '@/util/request'

export const getHistoryApi = (data = {}) => {
  return request.get('/history/query', data, { mock: false })
}

export const checkHistoryApi = (data = {}) => {
  return request.get('/history/check', data, { mock: false })
}
