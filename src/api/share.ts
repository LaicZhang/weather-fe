import request from '@/util/request'

export const getShareListApi = (data = {}) => {
  return request.get('/share/list/all', data, { mock: false })
}

export const addShareApi = (data = {}) => {
  return request.get('/share/screenshot', data, { mock: false })
}

export const deleteShareApi = (data = {}) => {
  return request.post('/share/delete', data, { mock: false })
}

export const getShareInfoApi = (data = {}) => {
  return request.get('/share/info', data, { mock: false })
}

export const openShareApi = (data = {}) => {
  return request.post('/share/open', data, { mock: false })
}

export const getShareListWithParamsApi = (data = {}) => {
  return request.get('/share/list', data, { mock: false })
}
