import config from '../config'
const namespace: string = config.namespace

export default {
  setItem(key: string, val: string) {
    const storage = getStorage()
    storage[key] = val
    setStorage(storage)
  },
  getItem(key: string) {
    const storage = getStorage()
    return storage[key] || {}
  },
  clearItem(key: string) {
    const storage = getStorage()
    Reflect.deleteProperty(storage, key)
    setStorage(storage)
  },
  clearAll() {
    window.localStorage.clear()
  },
}
function getStorage() {
  return JSON.parse(window.localStorage.getItem(namespace) as any) || {}
}
function setStorage(obj: any) {
  window.localStorage.setItem(namespace, JSON.stringify(obj))
}
