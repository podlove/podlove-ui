<template>
  <div
    class="overflow-auto body mobile:p-4 tablet:p-6"
    data-test="tab-transcripts--results"
    :style="heightByIndex(0, prerender.length - 1)"
    @scroll="renderWindow()"
    @mousewheel="disableFollow()"
    @DOMMouseScroll="disableFollow()"
  >
    <div :style="{ height: heightByIndex(0, start) + 'px' }" />
    <div :style="{ height: heightByIndex(start, end) + 'px' }">
      <transcript-entry
        v-for="(entry, index) in slice(start, end)"
        :key="index"
        data-test="tab-transcripts--entry"
        :entry="entry"
        :playtime="playtime"
        :search-query="query"
        :ghost-active="ghostActive"
        :ghost-time="ghostTime"
        :search-results="searchResults"
        :chapter-style="chapterStyle"
        :speaker-style="speakerStyle"
        :highlight-style="highlightStyle"
        :active-style="activeStyle"
        @onClick="onClick"
        @onMouseOver="onMouseOver"
        @onMouseLeave="onMouseLeave"
      />
    </div>
    <div :style="{ height: heightByIndex(end, prerender.length - 1) + 'px' }" />
  </div>
</template>

<script>
import color from 'color'
import { compose } from 'ramda'
import { mapState, injectStore } from 'redux-vuex'
import { simulatePlaytime, requestPlaytime } from '@podlove/player-actions/timepiece'
import { requestPlay } from '@podlove/player-actions/play'
import { enableGhost, disableGhost } from '@podlove/player-actions/progress'
import { followTranscripts } from '@podlove/player-actions/transcripts'
import select from 'store/selectors'

import TranscriptEntry from './Entry'

const RENDER_BUFFER = 10

export default {
  components: {
    TranscriptEntry
  },
  props: {
    prerender: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    return {
      state: mapState({
        playtime: select.playtime,
        ghostActive: select.ghost.active,
        ghostTime: select.ghost.time,
        timeline: select.transcripts.timeline,
        active: select.transcripts.active,
        follow: select.transcripts.follow,
        searchResults: select.transcripts.searchResults,
        query: select.transcripts.searchQuery,
        selected: select.transcripts.searchSelected,
        fontCi: select.theme.fontCi,
        fontBold: select.theme.fontBold,
        shadeDark: select.theme.shadeDark,
        alt: select.theme.alt
      }),
      dispatch: injectStore().dispatch
    }
  },
  data() {
    return {
      start: 0,
      end: 0
    }
  },
  computed: {
    chapterStyle() {
      return {
        ...this.state.fontCi
      }
    },
    speakerStyle() {
      return {
        ...this.state.fontBold
      }
    },
    highlightStyle() {
      return {
        background: this.state.shadeDark
      }
    },
    activeStyle() {
      return {
        cursor: 'pointer',
        background: color(this.state.alt).fade(0.8)
      }
    },
    active() {
      return this.state.active
    },
    follow() {
      return this.state.follow
    },
    selected() {
      return this.state.selected
    }
  },
  watch: {
    active() {
      this.follow && this.state.selected === -1 && this.scrollWindow()
    },
    follow() {
      this.follow && this.scrollWindow()
    },
    selected() {
      if (this.state.query.length === 0 || this.selected === -1) {
        return
      }

      this.scrollTo(this.searchResults[this.selected - 1])
    }
  },
  mounted() {
    // Render the transcripts
    this.renderWindow(this.state.active)

    // Scroll to the active transcript
    this.scrollTo(this.state.active)
  },
  methods: {
    onMouseOver({ start }) {
      this.dispatch(enableGhost())
      this.dispatch(simulatePlaytime(start))
    },
    onMouseLeave() {
      this.dispatch(disableGhost())
    },
    onClick({ start }) {
      this.dispatch(requestPlaytime(start))
      this.dispatch(requestPlay())
    },
    disableFollow() {
      this.dispatch(followTranscripts(false))
    },
    inRange(index) {
      if (index < 0) {
        return 0
      }

      if (index >= this.prerender.length - 1) {
        return this.prerender.length - 1
      }

      return index
    },
    indexByHeight(search, index = 0, height = 0) {
      if (search <= height) {
        return index - 1
      }

      if (index < 0) {
        return 0
      }

      if (index > this.prerender.length - 1) {
        return this.prerender.length - 1
      }

      return this.indexByHeight(search, index + 1, height + this.prerender[index])
    },
    heightByIndex(start = 0, end = -1) {
      return this.prerender.slice(start, end).reduce((result, element) => result + element, 0)
    },
    slice(start = 0, end = 0) {
      // slice not includes the last end element, therefore + 1
      return this.state.timeline.slice(start, end + 1)
    },
    renderWindow(startIndex = -1) {
      window.requestAnimationFrame(() => {
        let endIndex

        if (startIndex === -1) {
          startIndex = this.indexByHeight(this.$el.scrollTop)
          endIndex = this.indexByHeight(this.$el.scrollTop + this.$el.clientHeight)
        } else {
          endIndex = this.indexByHeight(this.heightByIndex(0, startIndex) + this.$el.clientHeight)
        }

        this.start = this.inRange(startIndex - RENDER_BUFFER)
        this.end = this.inRange(endIndex + RENDER_BUFFER)
      })
    },
    scrollWindow() {
      window.requestAnimationFrame(() => {
        // If transcript isn't in rendered slice, mostly initial or on scrub
        if (this.start > this.state.active || this.end < this.state.active) {
          this.scrollTo(this.state.active)
        }

        // Follow mode is off or ghost mode is on
        if (!this.state.follow || this.state.ghostActive) {
          return
        }

        // Get the active element
        const activeNode = this.$el.querySelector('.active-transcript')

        if (!activeNode) {
          return
        }

        // Header + buffer ~> 190px height
        const scrollPosition = activeNode.offsetTop - activeNode.clientHeight - 190

        this.$el.scroll && this.$el.scroll({ behavior: 'smooth', top: scrollPosition })
      })
    },
    scrollTo(index) {
      this.$el.scroll && this.$el.scroll({ top: this.heightByIndex(0, index) })
    }
  }
}
</script>
