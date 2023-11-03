import request from '@/util/request'

export function addFeedbackApi(data = {}) {
  return request.post('/feedback/add', data, { mock: false })
}

export function getFeedbackListApi(data = {}) {
  return request.get('/feedback/list/all', data, { mock: false })
}

export function getQueryListApi(data = {}) {
  return request.get('/feedback/list', data, { mock: false })
}

export function replyApi(data = {}) {
  return request.post('/feedback/reply', data, { mock: false })
}

export function deleteFeedbackApi(data = {}) {
  return request.post('/feedback/delete', data, { mock: false })
}
