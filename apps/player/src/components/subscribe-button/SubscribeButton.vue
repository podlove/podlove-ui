<template>
  <button
    v-if="state.available"
    class="h-6 px-2 flex items-center text-xs rounded-sm border whitespace-no-wrap"
    data-test="subscribe-button"
    :aria-label="$t(state.a11y.key, state.a11y.attr)"
    :style="style"
    @click="show"
  >
    <icon class="mr-1" aria-hidden="true" type="plus" />
    <span>{{ $t('SUBSCRIBE') }}</span>
  </button>
</template>

<script>
import Icon from '@podlove/components/icons'
import { mapState, injectStore } from 'redux-vuex'
import { compose } from 'ramda'
import * as overlay from '@podlove/button-actions/overlay'

import select from 'store/selectors'

export default {
  components: { Icon },
  setup() {
    return {
      state: mapState({
        color: select.theme.brandDark,
        background: select.theme.alt,
        font: select.theme.fontBold,
        available: select.subscribeButton.available,
        a11y: select.accessibility.subscribeButton
      }),
      dispatch: injectStore().dispatch
    }
  },
  computed: {
    style() {
      return {
        color: this.state.color,
        'border-color': this.state.color,
        background: this.state.background,
        ...this.state.font
      }
    }
  },
  methods: {
    show() {
      this.dispatch(overlay.show())
    }
  }
}
</script>
