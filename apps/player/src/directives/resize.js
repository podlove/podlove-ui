function onceInteractive(cb) {
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    return cb()
  }

  setTimeout(() => onceInteractive(cb), 100)
}

export default {
  bind(el, { value }) {
    el.onResize = () => value(el)
    window.addEventListener('resize', el.onResize)
  },

  inserted(el) {
    onceInteractive(el.onResize)
  }
}
