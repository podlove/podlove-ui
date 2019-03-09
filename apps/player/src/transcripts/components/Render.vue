<template lang="pug">
   div(:style="heightByIndex(0, prerender.length - 1)" @scroll="renderWindow()" @mousewheel="disableFollow()" @DOMMouseScroll="disableFollow()")
      div(:style="{ height: heightByIndex(0, start) + 'px' }")
      div(:style="{ height: heightByIndex(start, end) + 'px' }")
        transcript-entry(
          v-for="(entry, index) in slice(start, end)"
          :key="index"
          :entry="entry"
          :playtime="playtime"
          :search-query="query"
          :ghost-active="ghostActive"
          :ghost-time="ghostTime"
          :search-results="searchResults"
          :chapter-style="chapterStyle"
          :active-style="activeStyle"
          :ghost-style="ghostStyle"
          @onClick="onClick"
          @onMouseOver="onMouseOver"
          @onMouseLeave="onMouseLeave"
        )
      div(:style="{ height: heightByIndex(end, prerender.length - 1) + 'px' }")
</template>

<script>
  import { reduce, head } from 'lodash'
  import { compose } from 'ramda'
  import { simulatePlaytime, requestPlaytime } from '@podlove/actions/timepiece'
  import { requestPlay } from '@podlove/actions/play'
  import { enableGhost, disableGhost } from '@podlove/actions/progress'
  import { followTranscripts } from '@podlove/actions/transcripts'
  import select from 'store/selectors'
  import store from 'store'

  import TranscriptEntry from './Entry'

  const RENDER_BUFFER = 10

  export default {
    props: {
      prerender: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        start: 0,
        end: 0,
        ...this.mapState({
          playtime: select.playtime,
          ghostActive: select.ghost.active,
          ghostTime: select.ghost.time,
          timeline: select.transcripts.timeline,
          active: select.transcripts.active,
          follow: select.transcripts.follow,
          searchResults: select.transcripts.searchResults,
          query: select.transcripts.searchQuery,
          selected: select.transcripts.searchSelected,
          chapterStyle: select.styles.transcriptsChapter,
          activeStyle: select.styles.transcriptsActive,
          ghostStyle: select.styles.transcriptsGhost
        })
      }
    },
    methods: {
      onMouseOver ({ start }) {
        store.dispatch(enableGhost())
        store.dispatch(simulatePlaytime(start))
      },
      onMouseLeave: compose(store.dispatch, disableGhost),
      onClick ({ start }) {
        store.dispatch(requestPlaytime(start))
        store.dispatch(requestPlay())
      },
      disableFollow () {
        store.dispatch(followTranscripts(false))
      },
      inRange (index) {
        if (index < 0) {
          return 0
        }

        if (index >= this.prerender.length - 1) {
          return this.prerender.length - 1
        }

        return index
      },
      indexByHeight (search, index = 0, height = 0) {
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
      heightByIndex (start = 0, end = -1) {
        return reduce(this.prerender.slice(start, end), (result, element) => result + element, 0)
      },
      slice (start = 0, end = 0) {
        // slice not includes the last end element, therefore + 1
        return this.timeline.slice(start, end + 1)
      },
      renderWindow (startIndex = -1) {
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
      scrollWindow () {
        window.requestAnimationFrame(() => {
          // If transcript isn't in rendered slice, mostly initial or on scrub
          if (this.start > this.active || this.end < this.active) {
            this.scrollTo(this.active)
          }

          // Follow mode is off or ghost mode is on
          if (!this.follow || this.ghostActive) {
            return
          }

          // Get the active element
          const activeNode = head(this.$el.querySelectorAll('.active'))

          if (!activeNode) {
            return
          }

          // Header + buffer ~> 100px height
          const scrollPosition = activeNode.offsetTop - activeNode.clientHeight - 100

          this.$el.scroll({ behavior: 'smooth', top: scrollPosition })
        })
      },
      scrollTo (index) {
        this.$el.scroll({ top: this.heightByIndex(0, index) })
      }
    },
    watch: {
      transcripts () {
        this.follow && this.selected === -1 && this.scrollWindow()
      },
      follow () {
        this.follow && this.scrollWindow()
      },
      selected () {
        if (this.query.length === 0 || this.selected === -1) {
          return
        }

        this.scrollTo(this.searchResults[this.selected])
      }
    },
    mounted () {
      // Render the transcripts
      this.renderWindow(this.active)

      // Scroll to the active transcript
      this.scrollWindow()
    },
    components: {
      TranscriptEntry
    }
  }
</script>
