<template>
  <li>
    <button @click="selectEpisode">
      {{ $t(state.playText.key, state.playText.attr) }}
    </button>
    <time
      role="timer"
      tabindex="0"
      :aria-label="$t(state.timerDuration.key, state.timerDuration.attr)"
    />
  </li>
</template>

<script>
import { mapState, injectStore } from 'redux-vuex'
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

  setup() {
    return {
      state: mapState({
        playing: select.driver.playing,
        playText: select.accessibility.episodePlay(this.episode),
        timerDuration: select.accessibility.episodeDuration(this.episode)
      }),
      dispatch: injectStore().dispatch
    }
  },

  methods: {
    toHumanTime,

    selectEpisode() {
      if (!this.episode.active) {
        return this.dispatch(selectEpisode({ index: this.index, play: true }))
      }

      if (this.state.playing) {
        return this.dispatch(requestPause())
      }

      return this.dispatch(requestPlay())
    }
  }
}
</script>
