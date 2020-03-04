<template lang="pug">
  div.flex.px-2.-mx-2.cursor-pointer.rounded-sm(:class="{'font-medium': episode.active}" :style="style" @mouseover="mouseOverHandler" @mouseleave="mouseLeaveHandler" :data-test="`tab-playlist--entry${episode.active ? '--active' : ''}`")

    span.w-8.py-2.mr-2.flex.justify-center.items-center(v-if="episode.active" @click="play()" aria-hidden="true" data-test="tab-playlist--entry--interaction")
      icon(:type="playing ? 'menu-pause' : 'menu-play'" :size="24")

    span.w-8.py-2.mr-2.flex.justify-center.items-center(v-else @click="select({ index, play: true })" aria-hidden="true" data-test="tab-playlist--entry--interaction")
      icon(v-if="hover" type="menu-play" :size="24")
      icon(v-else type="menu-empty" :size="12")

    span.block.w-full.py-2.mr-2(@click="select({ index, play: true })" data-test="tab-playlist--entry--title") {{ episode.title }}

    timer.block.w-18.py-2(v-if="episode.duration" :time="episode.duration"  data-test="tab-playlist--entry--timer")

    button.invisible.hidden(@click="select({ index, play: true })") {{ $t('A11Y.PLAYLIST_ENTRY', episode) }}
</template>

<script>
import color from 'color'
import { compose } from 'ramda'
import { selectEpisode } from '@podlove/player-actions/playlist'
import { requestPlay, requestPause } from '@podlove/player-actions/play'
import { Icon, Timer } from '@podlove/components'
import { toHumanTime } from '@podlove/utils/time'

import select from 'store/selectors'
import store from 'store'

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

  data() {
    return {
      ...this.mapState({
        color: select.theme.brandLightest,
        playing: select.driver.playing
      }),
      hover: false
    }
  },

  computed: {
    active() {
      return this.chapter.active || this.hover
    },

    a11y() {
      const remaining = this.chapter.active
        ? this.chapter.end - this.playtime
        : this.chapter.end - this.chapter.start

      return {
        ...this.chapter,
        remaining: toHumanTime(remaining > 0 ? remaining : 0),
        duration: toHumanTime(this.chapter.end - this.chapter.start)
      }
    },

    style() {
      return this.hover
        ? {
            background: color(this.color)
              .alpha(0.3)
              .string()
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
      if (this.playing) {
        store.dispatch(requestPause())
      } else {
        store.dispatch(requestPlay())
      }
    },

    select: compose(store.dispatch, selectEpisode)
  }
}
</script>
