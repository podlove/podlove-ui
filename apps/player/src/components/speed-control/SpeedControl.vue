<template lang="pug">
  button(@click="nextRate" @dblclick="setRate(1)" data-test="speed-control")
    icon(:type="icon" :color="color" :data-test="`speed-control--${icon}`")
</template>

<script>
import { mapState } from 'redux-vuex'
import Icon from '@podlove/components/icons'
import { setRate } from '@podlove/player-actions/audio'
import { compose } from 'ramda'

import store from 'store'
import select from 'store/selectors'

const steps = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2.0]

export default {
  components: {
    Icon
  },
  data: mapState({
    rate: select.audio.rate,
    color: select.theme.brandDark
  }),
  computed: {
    icon() {
      if (this.rate <= 0.5) {
        return 'speed-050'
      }

      if (this.rate <= 0.75) {
        return 'speed-075'
      }

      if (this.rate <= 1) {
        return 'speed-100'
      }

      if (this.rate <= 1.25) {
        return 'speed-125'
      }

      if (this.rate <= 1.5) {
        return 'speed-150'
      }

      if (this.rate <= 1.75) {
        return 'speed-175'
      }

      return 'speed-200'
    }
  },
  methods: {
    nextRate() {
      const next = steps.indexOf(this.rate) + 1

      if (next < steps.length) {
        return this.setRate(steps[next])
      }

      return this.setRate(steps[0])
    },
    setRate: compose(store.dispatch, setRate)
  }
}
</script>
