<template lang="pug">
  li(:aria-label="episode.title")
    button(@click="selectEpisode") {{ $t(buttonText.key, buttonText.attr) }}
    span(role="timer" :aria-label="$t(timerDuration.key, timerDuration.attr)") {{ toHumanTime(episode.duration) }}

</template>

<script>
import store from 'store'
import { mapState } from 'redux-vuex'
import select from 'store/selectors'
import { toHumanTime } from '@podlove/utils/time'
import { selectEpisode } from '@podlove/player-actions/playlist'
import { requestPlay, requestPause } from '@podlove/player-actions/play'

export default {
  props: {
    episode: {
      type: Object,
      default: () => ({})
    },
    index: {
      type: Number,
      default: null
    }
  },

  data: mapState({
    playing: select.driver.playing,
    playText: select.accessibility.episodePlay,
    timerDuration: select.accessibility.timerDuration
  }),

  computed: {
    buttonText() {
      return this.playText(this.episode)
    }
  },

  methods: {
    toHumanTime,

    selectEpisode() {
      if (!this.episode.active) {
        return store.dispatch(selectEpisode({ index: this.index, play: true }))
      }

      if (this.playing) {
        return store.dispatch(requestPause())
      }

      return store.dispatch(requestPlay())
    }
  }
}
</script>
