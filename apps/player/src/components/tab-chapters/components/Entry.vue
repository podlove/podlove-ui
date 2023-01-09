<template>
  <div
    class="flex px-2 rounded-sm"
    data-test="tab-chapters--entry"
    :class="{ 'font-medium': chapter.active, 'bg-opacity-25': hover }"
    :style="style"
    @mouseover="mouseOverHandler"
    @mouseleave="mouseLeaveHandler"
  >
    <span
      class="cursor-pointer w-8 py-2 mr-2 flex items-center justify-center"
      aria-hidden="true"
      @click="selectChapter()"
    >
      <icon
        v-if="action.icon"
        :type="action.icon"
        :size="24"
        :data-test="`tab-chapters--trigger--${action.icon}`"
      />
      <span v-else data-test="tab-chapters--index">{{ action.content }}</span>
    </span>
    <chapter-progress
      class="w-full"
      :chapter="chapter"
      :show-link="true"
      :playtime="state.playtime"
      :ghost="state.ghost"
      :progress-color="progressColor"
      @chapter="dispatch"
      @play="dispatch"
      @ghost="dispatch"
      @simulate="dispatch"
      @playtime="dispatch"
      @hover="linkMouseover"
    />
  </div>
</template>

<script>
import { mapState, injectStore } from 'redux-vuex'
import { lighten } from 'farbraum'
import { setChapter } from '@podlove/player-actions/chapters'
import { requestPlay, requestPause } from '@podlove/player-actions/play'

import select from '../../../store/selectors'

import ChapterProgress from '@podlove/components/chapter-progress/ChapterProgress.vue'
import Icon from '@podlove/components/icons/Icon.vue'

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

  setup() {
    return {
      state: mapState({
        playtime: select.playtime,
        brandLightest: select.theme.brandLightest,
        brandDark: select.theme.brandDark,
        ghost: select.ghost.time,
        current: select.chapters.current,
        playing: select.driver.playing
      }),
      dispatch: injectStore().dispatch
    }
  },

  data() {
    return {
      hover: false,
      linkHover: false
    }
  },

  computed: {
    active() {
      return this.chapter.active || this.hover
    },

    progressColor() {
      return lighten(this.state.brandDark, 0.1)
    },

    style() {
      return this.hover
        ? {
            background: this.state.brandLightest,
            color: this.state.brandDark
          }
        : {}
    },

    action() {
      if (this.linkHover) {
        return {
          icon: 'link'
        }
      }

      if (this.state.current.index === this.chapter.index) {
        return {
          icon: this.state.playing ? 'menu-pause' : 'menu-play'
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

    selectChapter(event) {
      if (this.linkHover) {
        return false
      }

      if (this.state.current.index === this.chapter.index) {
        this.dispatch(this.state.playing ? requestPause() : requestPlay())
        return false
      }

      this.dispatch(setChapter(this.chapter.index - 1))
      this.dispatch(requestPlay())
      event && event.preventDefault()
      return false
    }
  }
}
</script>
