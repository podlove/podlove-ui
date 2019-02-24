import Vue from 'vue'
import select from 'store/selectors'

export default component => Vue.component('button-color', {
  props: {
    variant: {
      type: String,
      default: null
    }
  },
  render: function (h) {
    return h(component, {
      props: {
        textColor: this.buttonStyle.color,
        backgroundColor: this.buttonStyle.background,
        borderColor: this.buttonStyle.border,
        ...this.$attrs
      }
    }, this.$slots.default)
  },

  data() {
    return this.mapState({
      buttonStyle: this.variant === 'light' ? select.styles.buttonLight : select.styles.button
    })
  }
})
