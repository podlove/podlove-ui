<template lang="pug">
  div.flex.px-2.-mx-2.rounded-sm(:class="{'font-medium': chapter.active}" :style="style" @mouseover="mouseOverHandler" @mouseleave="mouseLeaveHandler" data-test="tab-chapters--entry")
    span.cursor-pointer.w-8.py-2.mr-2.flex.items-center.justify-center(@click="selectChapter()" aria-hidden="true")
      icon(v-if="action.icon" :type="action.icon" :size="24" :data-test="`tab-chapters--trigger--${action.icon}`")
      span(v-else data-test="tab-chapters--index") {{ action.content }}

    chapter-progress.w-full(
      :chapter="chapter"
      :showLink="true"
      :playtime="playtime"
      :ghost="ghost"
      :progressColor="progressColor"
      @chapter="dispatch"
      @play="dispatch"
      @ghost="dispatch"
      @simulate="dispatch"
      @playtime="dispatch"
      @hover="linkMouseover"
    )

    button.invisible.hidden(@click="selectChapter") {{ $t('A11Y.CHAPTER_ENTRY', a11y) }}
</template>

<script>
import { mapActions } from 'redux-vuex'
import color from 'color'
import { setChapter } from '@podlove/player-actions/chapters'
import { requestPlay, requestPause } from '@podlove/player-actions/play'
import { toHumanTime } from '@podlove/utils/time'

import select from 'store/selectors'
import store from 'store'

import ChapterProgress from '@podlove/components/chapter-progress'
import Icon from '@podlove/components/icons'

export default {
  components: {
    Icon,
    ChapterProgress
  },

  props: {
    chapter: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      ...this.mapState({
        playtime: select.playtime,
        color: select.theme.brandLightest,
        ghost: select.ghost.time,
        current: select.chapters.current,
        playing: select.driver.playing
      }),

      hover: false,
      linkHover: false
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

    progressColor() {
      return color(this.color)
        .alpha(0.5)
        .string()
    },

    style() {
      return this.hover
        ? {
            background: color(this.color)
              .alpha(0.3)
              .string()
          }
        : {}
    },

    action() {
      if (this.linkHover) {
        return {
          icon: 'link'
        }
      }

      if (this.current.index === this.chapter.index) {
        return {
          icon: this.playing ? 'menu-pause' : 'menu-play'
        }
      }

      if (this.hover) {
        return {
          icon: 'menu-play'
        }
      }

      return {
        content: this.chapter.index
      }
    }
  },

  methods: {
    mouseOverHandler() {
      this.hover = true
    },

    mouseLeaveHandler() {
      this.hover = false
    },

    linkMouseover(state) {
      this.linkHover = state
    },

    ...mapActions({
      selectChapter: function({ dispatch }, event) {
        if (this.linkHover) {
          return false
        }

        if (this.current.index === this.chapter.index) {
          dispatch(this.playing ? requestPause() : requestPlay())
          return false
        }

        dispatch(setChapter(this.chapter.index - 1))
        dispatch(requestPlay())
        event && event.preventDefault()
        return false
      }
    }),
    dispatch: store.dispatch
  }
}
</script>
