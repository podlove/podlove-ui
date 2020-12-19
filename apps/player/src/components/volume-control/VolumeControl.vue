<template lang="pug">
  v-popover(
    :placement="placement"
    popoverArrowClass="hidden"
    :popoverInnerClass="['bg-transparent']"
    trigger="click"
    offset="15"
    ref="volumePopover"
  )
    button.block.tooltip-target.cursor-pointer(:title="$t(buttonTitle.key, buttonTitle.attr)" @click="focus" data-test="volume-control")
      icon(aria-hidden="true" :type="icon" :color="color")

    template(slot="popover")
      div.w-40.px-2.rounded.shadow(:style="{ background, color: background }")
        input-slider.mr-5(
          ref="volumeControl"
          tabindex="0"
          data-test="volume-control--slider"
          :min="0"
          :max="100"
          :value="volume * 100"
          :step="1"
          :background="color"
          :borderColor="color"
          :progressColor="progressColor"
          @input="setVolume"
          :aria-label="$t(volumeLabel.key, volumeLabel.attr)"
        )
</template>

<script>
import { mapState } from 'redux-vuex'
import Icon from '@podlove/components/icons'
import InputSlider from '@podlove/components/input-slider'
import { setVolume } from '@podlove/player-actions/audio'
import { compose, path } from 'ramda'

import store from 'store'
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
      validator: val => ['left', 'right'].includes(val)
    }
  },
  data: mapState({
    volume: select.audio.volume,
    muted: select.audio.muted,
    icon: select.audio.icon,
    color: select.theme.brandDark,
    progressColor: select.theme.brandDark,
    background: select.theme.brandLightest,
    buttonTitle: select.accessibility.volumeButton,
    volumeLabel: select.accessibility.volumeControl
  }),
  methods: {
    setVolume: compose(store.dispatch, setVolume, val => val / 100),
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
