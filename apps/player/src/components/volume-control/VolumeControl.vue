<template>
  <v-popover
    ref="volumePopover"
    popover-arrow-class="hidden"
    :placement="placement"
    :popover-inner-class="['bg-transparent']"
    trigger="click"
    offset="15"
    v-if="available"
  >
    <button
      class="block.tooltip-target.cursor-pointer"
      data-test="volume-control"
      :title="$t(state.buttonTitle.key, state.buttonTitle.attr)"
      @click="focus"
    >
      <icon aria-hidden="true" :type="state.icon" :color="state.color" />
    </button>
    <template slot="popover">
      <div
        class="w-40.px-2.rounded.shadow"
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
          :aria-label="$t(state.volumeLabel.key, state.volumeLabel.attr)"
          @input="setVolume"
        />
      </div>
    </template>
  </v-popover>
</template>

<script>
import { mapState, injectStore } from 'redux-vuex'
import Icon from '@podlove/components/icons'
import InputSlider from '@podlove/components/input-slider'
import { setVolume } from '@podlove/player-actions/audio'
import { compose, path } from 'ramda'

import select from 'store/selectors'

export default {
  components: {
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
      const popover = path(['volumePopover', '$el'], this.$refs)
      const control = path(['volumeControl', '$el'], this.$refs)

      setTimeout(() => {
        if (popover.className.includes('open')) {
          control.focus()
        }
      }, 300)
    }
  }
}
</script>
