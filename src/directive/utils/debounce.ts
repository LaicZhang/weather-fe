const debounce = {
  inserted(el: any, binding: any) {
    let timer: any
    el.addEventListener('keyup', () => {
      if (timer)
        clearTimeout(timer)

      timer = setTimeout(() => {
        binding.value()
      }, 1000)
    })
  },
}

export default debounce
