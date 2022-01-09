import config from "../config";

export default {
    setItem(key, value) {
        let storage = this.getStorage();
        storage[key] = value
        window.localStorage.setItem(config.namespace, JSON.stringify(storage));
    },
    getStorage(){
        return JSON.parse(window.localStorage.getItem(config.namespace)|| '{}');
    },
    getItem(key){
        return this.getStorage()[key]
    },
    clearItem(key){
        let storage = this.getStorage();
        delete storage[key]
        window.localStorage.setItem(config.namespace, JSON.stringify(storage));
    },
    clearAll(){
        window.localStorage.clear();
    }
}