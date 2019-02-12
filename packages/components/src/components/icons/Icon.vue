<template>
  <component :is="`${type}-icon`" :color="color" :background="background" :size="size" aria-hidden="true" />
</template>

<script>
import { background, color } from 'defaults'

import types from './types'

import PlayIcon from './states/Play'
import PauseIcon from './states/Pause'
import RestartIcon from './states/Restart'
import LoadingIcon from './states/Loading'
import NextIcon from './states/Next'
import PreviousIcon from './states/Previous'
import ForwardIcon from './states/Forward'
import BackwardsIcon from './states/Backwards'
import InfoIcon from './states/Info'
import CloseIcon from './states/Close'
import ClockIcon from './states/Clock'
import CalendarIcon from './states/Calendar'
import LinkIcon from './states/Link'
import ChapterIcon from './states/Chapter'

export default {
  props: {
    type: {
      type: String,
      required: true,
      validator: (val) => types.includes(val)
    },
    background: {
      type: String,
      default: 'currentColor'
    },
    color: {
      type: String,
      default: 'currentColor'
    },
    size: {
      type: Number
    }
  },
  components: {
    PlayIcon, PauseIcon, RestartIcon, LoadingIcon, NextIcon, PreviousIcon, ForwardIcon, BackwardsIcon, InfoIcon, CloseIcon, ClockIcon, CalendarIcon, LinkIcon, ChapterIcon
  }
}
</script>
