import request from '@/util/request'

export const getShareListApi = (data = {}) => {
  return request.get('/share/list/all', data, { mock: false })
}

export const addShareApi = (data = {}) => {
  return request.get('/share/screenshot', data, { mock: false })
}

export const deleteShareApi = (data = {}) => {
  return request.get('/share/delete', data, { mock: false })
}
