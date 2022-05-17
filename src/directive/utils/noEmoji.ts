const findEle = (parent: any, type: any) => {
  return parent.tagName.toLowerCase() === type ? parent : parent.querySelector(type)
}

const trigger = (el: any, type: any) => {
  const e = document.createEvent('HTMLEvents')
  e.initEvent(type, true, true)
  el.dispatchEvent(e)
}

const emoji = {
  bind(el: any) {
    // 正则规则可根据需求自定义
    const regRule = /[^u4E00-u9FA5|d|a-zA-Z|rns,.?!，。？！…—&$=()-+/*{}[]]|s/g
    const $inp = findEle(el, 'input')
    el.$inp = $inp
    $inp.handle = function () {
      const val = $inp.value
      $inp.value = val.replace(regRule, '')

      trigger($inp, 'input')
    }
    $inp.addEventListener('keyup', $inp.handle)
  },
  unbind(el: any) {
    el.$inp.removeEventListener('keyup', el.$inp.handle)
  },
}

export default emoji
