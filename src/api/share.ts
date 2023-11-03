import request from '@/util/request'

export function getShareListApi(data = {}) {
  return request.get('/share/list/all', data, { mock: false })
}

export function addShareApi(data = {}) {
  return request.get('/share/screenshot', data, { mock: false })
}

export function deleteShareApi(data = {}) {
  return request.post('/share/delete', data, { mock: false })
}

export function getShareInfoApi(data = {}) {
  return request.get('/share/info', data, { mock: false })
}

export function openShareApi(data = {}) {
  return request.post('/share/open', data, { mock: false })
}

export function getShareListWithParamsApi(data = {}) {
  return request.get('/share/list', data, { mock: false })
}
