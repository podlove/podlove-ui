<template>
  <li>
    <button @click="selectChapter">
      {{ $t(state.buttonText.key, state.buttonText.attr) }}
    </button>
    <time
      role="timer"
      tabindex="0"
      :title="$t(state.timerRemaining.key, state.timerRemaining.attr)"
    />
  </li>
</template>

<script>
import { mapState, injectStore } from 'redux-vuex'
import select from 'store/selectors'
import { toHumanTime } from '@podlove/utils/time'
import { setChapter } from '@podlove/player-actions/chapters'
import { requestPlay, requestPause } from '@podlove/player-actions/play'

export default {
  props: {
    chapter: {
      type: Object,
      default: () => ({})
    }
  },

  setup() {
    return {
      state: mapState({
        buttonText: select.accessibility.chapterPlay(this.chapter),
        timerRemaining: select.accessibility.chapterTimerRemaining(this.chapter),
        current: select.chapters.current,
        playtime: select.playtime,
        playing: select.driver.playing
      }),
      dispatch: injectStore().dispatch
    }
  },

  computed: {
    remaining() {
      return toHumanTime(
        this.chapter.active
          ? this.chapter.end - this.state.playtime
          : this.chapter.end - this.chapter.start
      )
    },
    duration() {
      return toHumanTime(this.chapter.end - this.chapter.start)
    }
  },

  methods: {
    selectChapter() {
      if (this.state.current.index === this.chapter.index) {
        this.dispatch(this.state.playing ? requestPause() : requestPlay())
      } else {
        this.dispatch(setChapter(this.chapter.index - 1))
        this.dispatch(requestPlay())
      }
    }
  }
}
</script>
