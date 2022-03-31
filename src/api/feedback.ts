import request from '@/util/request'

export const addFeedbackApi = (data = {}) => {
  return request.post('/feedback/add', data, { mock: false })
}

export const getFeedbackListApi = (data = {}) => {
  return request.get('/feedback/list', data, { mock: false })
}

export const replyApi = (data = {}) => {
  return request.post('/feedback/reply', data, { mock: false })
}

export const deleteFeedbackApi = (data = {}) => {
  return request.post('/feedback/delete', data, { mock: false })
}
