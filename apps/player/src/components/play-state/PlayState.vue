<template lang="pug">
  transition(name="fade")
    slot(v-if="active")
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
  data: mapState({
    playstate: select.playstate
  }),
  computed: {
    matcher() {
      return typeof this.on === 'string' ? [this.on] : this.on
    },
    active() {
      return this.matcher.includes(this.playstate)
    }
  }
}
</script>
