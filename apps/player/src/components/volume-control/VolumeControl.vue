<template>
  <div v-if="state.available" class="block">
    <div class="sr-only">
      <input
        type="number"
        :min="0"
        :max="100"
        :value="state.volume * 100"
        :step="5"
        aria-valuemin="0"
        aria-valuemax="100"
        :aria-valuenow="state.volume * 100"
        :aria-valuetext="$t(state.volumeLabel.key, state.volumeLabel.attr)"
        @input="setVolume($event.target.value)"
      />
    </div>
    <dropdown ref="volumePopover" :triggers="['click']" :offset="[0, 15]" :placement="placement">
      <button
        class="block cursor-pointer"
        data-test="volume-control"
        aria-hidden="true"
        @click="focus"
      >
        <icon aria-hidden="true" :type="state.icon" :color="state.color" />
      </button>
      <template #popper>
        <div
          class="w-40 px-4 rounded"
          :style="{ background: state.background, color: state.background }"
        >
          <input-slider
            ref="volumeControl"
            class="mr-5"
            tabindex="0"
            data-test="volume-control--slider"
            :min="0"
            :max="100"
            :value="state.volume * 100"
            :step="1"
            :background="state.color"
            :border-color="state.color"
            :progress-color="state.progressColor"
            @sliderInput="setVolume"
          />
        </div>
      </template>
    </dropdown>
  </div>
</template>

<script>
import { mapState, injectStore } from 'redux-vuex'
import Icon from '@podlove/components/icons/Icon.vue'
import InputSlider from '@podlove/components/input-slider/InputSlider.vue'
import { setVolume } from '@podlove/player-actions/audio'
import { Dropdown } from 'v-tooltip'

import select from 'store/selectors'

export default {
  components: {
    Dropdown,
    InputSlider,
    Icon
  },
  props: {
    placement: {
      type: String,
      default: 'left',
      validator: (val) => ['left', 'right'].includes(val)
    }
  },
  setup() {
    return {
      state: mapState({
        volume: select.audio.volume,
        icon: select.audio.icon,
        color: select.theme.brandDark,
        progressColor: select.theme.brandDark,
        background: select.theme.brandLightest,
        buttonTitle: select.accessibility.volumeButton,
        volumeLabel: select.accessibility.volumeControl,
        available: select.components.volumeControl
      }),
      dispatch: injectStore().dispatch
    }
  },
  methods: {
    setVolume(val) {
      this.dispatch(setVolume(val / 100))
    },
    focus() {
      setTimeout(() => {
        const control = this.$refs.volumeControl
        if (control.$el) {
          control.$el.querySelector('input').focus()
        }
      }, 300)
    }
  }
}
</script>

<style lang="scss">
@import 'v-tooltip/dist/v-tooltip.css';

.v-popper--theme-dropdown .v-popper__inner {
  padding: 0;
  background: transparent;
}

.v-popper--theme-dropdown .v-popper__arrow {
  border-color: red;
}
</style>
