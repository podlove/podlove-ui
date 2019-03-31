import Vue from 'vue'
import select from 'store/selectors'
import { mapState } from 'redux-vuex'

export default component =>
  Vue.component('input-color', {
    data: mapState({
      style: select.styles.inputStyle
    }),
    methods: {
      proxyEvent(event) {
        return val => this.$emit(event, val)
      }
    },
    render: function(h) {
      return h(
        component,
        {
          props: {
            color: this.style.color,
            background: this.style.background,
            borderColor: this.style.border,
            ...this.$attrs
          },
          on: {
            click: this.proxyEvent('click'),
            input: this.proxyEvent('input'),
            change: this.proxyEvent('change'),
            dblclick: this.proxyEvent('dblclick')
          }
        },
        this.$slots.default
      )
    }
  })
