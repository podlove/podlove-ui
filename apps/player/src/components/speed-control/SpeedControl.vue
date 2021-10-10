<template>
  <button
    data-test="speed-control"
    :title="$t(state.a11y(nextRate * 100).key, state.a11y(nextRate * 100).attr)"
    @click="setRate"
    @dblclick="setRate(1)"
  >
    <icon
      aria-hidden="true"
      :type="icon"
      :color="state.color"
      :data-test="`speed-control--${icon}`"
    />
  </button>
</template>

<script>
import { mapState, injectStore } from 'redux-vuex'
import Icon from '@podlove/components/icons'
import { setRate } from '@podlove/player-actions/audio'
import { compose } from 'ramda'

import select from 'store/selectors'

const steps = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2.0]

export default {
  components: {
    Icon
  },
  setup() {
    return {
      state: mapState({
        rate: select.audio.rate,
        color: select.theme.brandDark,
        a11y: select.accessibility.speedControl
      }),
      dispatch: injectStore().dispatch
    }
  },
  computed: {
    icon() {
      if (this.state.rate <= 0.5) {
        return 'speed-050'
      }

      if (this.state.rate <= 0.75) {
        return 'speed-075'
      }

      if (this.state.rate <= 1) {
        return 'speed-100'
      }

      if (this.state.rate <= 1.25) {
        return 'speed-125'
      }

      if (this.state.rate <= 1.5) {
        return 'speed-150'
      }

      if (this.state.rate <= 1.75) {
        return 'speed-175'
      }

      return 'speed-200'
    },

    nextRate() {
      const next = steps.indexOf(this.state.rate) + 1

      if (next < steps.length) {
        return steps[next]
      }

      return steps[0]
    }
  },
  methods: {
    setRate() {
      this.dispatch(setRate(this.nextRate))
    }
  }
}
</script>
