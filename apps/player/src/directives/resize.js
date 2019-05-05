export default {
  bind(el, { value }) {
    el.onResize = () => value(el)
    window.addEventListener('resize', el.onResize)
  },

  inserted(el) {
    setTimeout(el.onResize, 100)
  }
}
