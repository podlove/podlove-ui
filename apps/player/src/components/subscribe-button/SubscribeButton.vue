<template lang="pug">
  button.h-6.px-2.flex.items-center.text-xs.rounded-sm.border.whitespace-no-wrap(v-if="available" @click="show" :style="style" data-test="subscribe-button")
    icon.mr-1(type="plus")
    span {{ $t('SUBSCRIBE') }}
</template>

<script>
import { Icon } from '@podlove/components'
import { mapState } from 'redux-vuex'
import { compose } from 'ramda'
import store from 'store'
import select from 'store/selectors'
import * as overlay from '@podlove/button-actions/overlay'

export default {
  components: { Icon },
  data: mapState({
    color: select.theme.brandDark,
    background: select.theme.alt,
    font: select.theme.fontBold,
    available: select.subscribeButton.available
  }),
  computed: {
    style() {
      return {
        color: this.color,
        'border-color': this.color,
        background: this.background,
        ...this.font
      }
    }
  },
  methods: {
    show: compose(store.dispatch, overlay.show)
  }
}
</script>
