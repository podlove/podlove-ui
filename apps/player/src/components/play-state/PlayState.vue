<template>
  <transition name="fade">
    <slot v-if="active" />
  </transition>
</template>

<script>
import { mapState } from 'redux-vuex'
import select from 'store/selectors'

export default {
  props: {
    on: {
      type: [String, Array],
      default: () => []
    }
  },
  setup() {
    return {
      state: mapState({
        playstate: select.playstate
      })
    }
  },
  computed: {
    matcher() {
      return typeof this.on === 'string' ? [this.on] : this.on
    },
    active() {
      return this.matcher.includes(this.state.playstate)
    }
  }
}
</script>
