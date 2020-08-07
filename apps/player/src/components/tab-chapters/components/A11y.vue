<template lang="pug">
  li
    button(@click="selectChapter") {{ $t(buttonText.key, buttonText.attr) }}
    time(role="timer" tabindex="0" :title="$t(timerRemaining.key, timerRemaining.attr)")

</template>

<script>
import store from 'store'
import { mapState } from 'redux-vuex'
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

  data() {
    return this.mapState({
      buttonText: select.accessibility.chapterPlay(this.chapter),
      timerRemaining: select.accessibility.chapterTimerRemaining(this.chapter),
      current: select.chapters.current,
      playtime: select.playtime,
      playing: select.driver.playing
    })
  },

  computed: {
    remaining() {
      return toHumanTime(
        this.chapter.active
          ? this.chapter.end - this.playtime
          : this.chapter.end - this.chapter.start
      )
    },
    duration() {
      return toHumanTime(this.chapter.end - this.chapter.start)
    }
  },

  methods: {
    selectChapter() {
      if (this.current.index === this.chapter.index) {
        store.dispatch(this.playing ? requestPause() : requestPlay())
      } else {
        store.dispatch(setChapter(this.chapter.index - 1))
        store.dispatch(requestPlay())
      }
    }
  }
}
</script>
