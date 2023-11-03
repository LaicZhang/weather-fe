import request from '@/util/request'

export function getDictApi(item = '', data = {}) {
  return request.get(`/dict?item=${item}`, data, { mock: false })
}
