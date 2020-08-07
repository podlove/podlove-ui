<template lang="pug">
  li
    button(@click="selectEpisode") {{ $t(playText.key, playText.attr) }}
    time(role="timer" tabindex="0" :aria-label="$t(timerDuration.key, timerDuration.attr)")

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

  data() {
    return this.mapState({
      playing: select.driver.playing,
      playText: select.accessibility.episodePlay(this.episode),
      timerDuration: select.accessibility.episodeDuration(this.episode)
    })
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
