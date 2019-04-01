export default {
  bind(el, { value }) {
    value(el)

    window.addEventListener('resize', () => value(el))
  }
}
