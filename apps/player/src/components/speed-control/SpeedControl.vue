<template lang="pug">
  button(@click="setRate" @dblclick="setRate(1)" data-test="speed-control" :title="$t(a11y(nextRate * 100).key, a11y(nextRate * 100).attr)")
    icon(aria-hidden="true" :type="icon" :color="color" :data-test="`speed-control--${icon}`")
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
    color: select.theme.brandDark,
    a11y: select.accessibility.speedControl
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
    },

    nextRate() {
      const next = steps.indexOf(this.rate) + 1

      if (next < steps.length) {
        return steps[next]
      }

      return steps[0]
    }
  },
  methods: {
    setRate() {
      console.log(this.nextRate)
      store.dispatch(setRate(this.nextRate))
    }
  }
}
</script>
