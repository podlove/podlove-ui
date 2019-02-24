import Vue from 'vue'
import select from 'store/selectors'
import { mapState } from 'redux-vuex'

export default component => Vue.component('input-color', {
  render: function (h) {
    return h(component, {
      props: {
        color: this.style.color,
        background: this.style.background,
        borderColor: this.style.border,
        ...this.$attrs
      }
    }, this.$slots.default)
  },

  data: mapState({
    style: select.styles.inputStyle
  })
})
