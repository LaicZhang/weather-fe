const debounce = {
  inserted(el, binding) {
    let timer
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
