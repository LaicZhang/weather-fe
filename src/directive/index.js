import debounce from './utils/debounce'
import emoji from './utils/noEmoji'
import LazyLoad from './utils/lazyLoad'
import copy from './utils/copyText'

const directives = {
  debounce,
  emoji,
  LazyLoad,
  copy,
}

export default {
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key])
    })
  },
}
