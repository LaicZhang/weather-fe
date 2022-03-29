import request from '@/util/request'

export const getDictApi = (item = '', data = {}) => {
  return request.get(`/dict?item=${item}`, data, { mock: false })
}
