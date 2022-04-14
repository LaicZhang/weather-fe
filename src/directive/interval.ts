const directive = {
  bind(el: any, binding: any) {
    if (!el) return
    // 加载中旋转 icon
    const loadingIcon = document.createElement('i')
    loadingIcon.className = 'el-icon-loading'

    // 覆盖元素防止点击
    const maskItem = document.createElement('span')
    // maskItem.style = 'position: absolute; width:calc(100% + 10px);height:calc(100% + 10px);top:-5px;left:-5px;z-index:10000;'
    maskItem.setAttribute(
      'style',
      'position: absolute; width:calc(100% + 10px);height:calc(100% + 10px);top:-5px;left:-5px;z-index:10000;',
    )
    maskItem.addEventListener('click', (e) => {
      e.stopPropagation()
    })

    el.style.position = 'relative'
    el.addEventListener('click', () => {
      el.appendChild(maskItem)
      el.appendChild(loadingIcon)
      setTimeout(() => {
        el.removeChild(loadingIcon)
        el.removeChild(maskItem)
      }, (binding && binding.value) || 0)
    })
  },
}
export default directive
