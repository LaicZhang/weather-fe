import config from "../config";
const namespace = config.namespace;

export default {
  setItem(key, val) {
    const storage = getStorage();
    storage[key] = val;
    setStorage(storage);
  },
  getItem(key) {
    const storage = getStorage();
    return storage[key] || {};
  },
  clearItem(key) {
    const storage = getStorage();
    Reflect.deleteProperty(storage, key);
    setStorage(storage);
  },
  clearAll() {
    window.localStorage.clear();
  },
};
function getStorage() {
  return JSON.parse(window.localStorage.getItem(namespace)) || {};
}
function setStorage(obj) {
  window.localStorage.setItem(namespace, JSON.stringify(obj));
}
