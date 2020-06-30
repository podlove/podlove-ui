<template lang="pug">
  v-popover(
    v-if="visible"
    :placement="placement"
    popoverArrowClass="hidden"
    :popoverInnerClass="['bg-transparent']"
    trigger="click"
    offset="15"
  )
    button.block.tooltip-target(:title="$t(buttonTitle.key, buttonTitle.attr)" @dblclick="setVolume(1)" data-test="volume-control")
      icon(aria-hidden="true" :type="icon" :color="color")

    template(slot="popover")
      div.w-40.px-2.rounded.shadow(:style="{ background, color: background }")
        input-slider.mr-5(
          data-test="volume-control--slider"
          :min="0"
          :max="100"
          :value="volume * 100"
          :step="1"
          :background="color"
          :borderColor="color"
          @input="setVolume"
          :aria-label="$t(volumeLabel.key, volumeLabel.attr)"
        )
</template>

<script>
import { mapState } from 'redux-vuex'
import Icon from '@podlove/components/icons'
import InputSlider from '@podlove/components/input-slider'
import { setVolume } from '@podlove/player-actions/audio'
import { compose } from 'ramda'

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
    background: select.theme.brandLightest,
    visible: select.components.volumeControl,
    buttonTitle: select.accessibility.volumeButton,
    volumeLabel: select.accessibility.volumeControl
  }),
  methods: {
    setVolume(val) {
      store.dispatch(setVolume(val / 100))
    }
  }
}
</script>
