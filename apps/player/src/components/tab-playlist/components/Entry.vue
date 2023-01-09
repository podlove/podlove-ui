<template>
  <div
    class="flex px-2 cursor-pointer rounded-sm"
    :class="{ 'font-medium': episode.active, 'bg-opacity-25': hover }"
    :style="style"
    :data-test="`tab-playlist--entry${episode.active ? '--active' : ''}`"
    @mouseover="mouseOverHandler"
    @mouseleave="mouseLeaveHandler"
  >
    <span
      v-if="episode.active"
      class="w-8 py-2 mr-2 flex justify-center items-center"
      aria-hidden="true"
      data-test="tab-playlist--entry--interaction"
      @click="play()"
    >
      <icon :type="state.playing ? 'menu-pause' : 'menu-play'" :size="24" />
    </span>

    <span
      v-else
      class="w-8 py-2 mr-2 flex justify-center items-center"
      aria-hidden="true"
      data-test="tab-playlist--entry--interaction"
      @click="select({ index, play: true })"
    >
      <icon v-if="hover" type="menu-play" :size="24" />
      <icon v-else type="menu-empty" :size="12" />
    </span>

    <span
      class="block w-full py-2 mr-2"
      data-test="tab-playlist--entry--title"
      @click="select({ index, play: true })"
    >
      {{ episode.title }}
    </span>
    <timer
      v-if="episode.duration"
      class="block w-18 py-2"
      :time="episode.duration"
      data-test="tab-playlist--entry--timer"
    />
  </div>
</template>

<script>
import { lighten } from 'farbraum'
import { mapState, injectStore } from 'redux-vuex'
import { selectEpisode } from '@podlove/player-actions/playlist'
import { requestPlay, requestPause } from '@podlove/player-actions/play'
import Timer from '@podlove/components/timer/Timer.vue'
import Icon from '@podlove/components/icons/Icon.vue'

import select from '../../../store/selectors'

export default {
  components: {
    Icon,
    Timer
  },

  props: {
    index: {
      type: Number,
      default: null
    },
    episode: {
      type: Object,
      default: () => ({})
    }
  },

  setup() {
    return {
      state: mapState({
        playing: select.driver.playing,
        brandLightest: select.theme.brandLightest,
        brandDark: select.theme.brandDark
      }),
      dispatch: injectStore().dispatch
    }
  },

  data() {
    return {
      hover: false
    }
  },

  computed: {
    active() {
      return this.episode.active || this.hover
    },
    style() {
      return this.hover
        ? {
            background: this.state.brandLightest,
            color: this.state.brandDark
          }
        : {}
    }
  },

  methods: {
    mouseOverHandler() {
      this.hover = true
    },

    mouseLeaveHandler() {
      this.hover = false
    },

    play() {
      if (this.state.playing) {
        this.dispatch(requestPause())
      } else {
        this.dispatch(requestPlay())
      }
    },

    select(position) {
      this.dispatch(selectEpisode(position))
    }
  }
}
</script>
