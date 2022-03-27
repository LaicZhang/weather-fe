const LazyLoad = {
  // install方法
  install(Vue: any, options: any) {
    const defaultSrc = options.default
    Vue.directive('lazy', {
      bind(el: any, binding: any) {
        LazyLoad.init(el, binding.value, defaultSrc)
      },
      inserted(el: any) {
        if (IntersectionObserver)
          LazyLoad.observe(el)
        else
          LazyLoad.listenerScroll(el)
      },
    })
  },
  // 初始化
  init(el: any, val: any, def: any) {
    el.setAttribute('data-src', val)
    el.setAttribute('src', def)
  },
  // 利用IntersectionObserver监听el
  observe(el: any) {
    const io = new IntersectionObserver((entries) => {
      const realSrc = el.dataset.src
      if (entries[0].isIntersecting) {
        if (realSrc) {
          el.src = realSrc
          el.removeAttribute('data-src')
        }
      }
    })
    io.observe(el)
  },
  // 监听scroll事件
  listenerScroll(el: any) {
    const handler = LazyLoad.throttle(LazyLoad.load, 300)
    LazyLoad.load(el)
    window.addEventListener('scroll', () => {
      handler(el)
    })
  },
  // 加载真实图片
  load(el: any) {
    const windowHeight = document.documentElement.clientHeight
    const elTop = el.getBoundingClientRect().top
    const elBtm = el.getBoundingClientRect().bottom
    const realSrc = el.dataset.src
    if (elTop - windowHeight < 0 && elBtm > 0) {
      if (realSrc) {
        el.src = realSrc
        el.removeAttribute('data-src')
      }
    }
  },
  // 节流
  throttle(fn: any, delay: any) {
    let timer: any
    let prevTime: any
    return (...args: any) => {
      const currTime = Date.now()
      if (!prevTime) prevTime = currTime
      clearTimeout(timer)

      if (currTime - prevTime > delay) {
        prevTime = currTime
        fn.apply(this, args)
        clearTimeout(timer)
        return
      }

      timer = setTimeout(() => {
        prevTime = Date.now()
        timer = null
        fn.apply(this, args)
      }, delay)
    }
  },
}

export default LazyLoad
