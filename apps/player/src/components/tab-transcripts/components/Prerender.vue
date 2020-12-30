<template>
  <div>
    <transcript-entry
      v-for="(entry, index) in transcripts"
      :key="index"
      :entry="entry"
      :prerender="true"
      :playtime="state.playtime"
      :search-query="state.searchQuery"
      :ghost-active="state.ghostActive"
      :ghost-time="state.ghostTime"
      :search-results="state.searchResults"
      :chapter-style="chapterStyle"
      :speaker-style="speakerStyle"
    />
  </div>
</template>

<script>
import { mapState } from 'redux-vuex'
import { asyncAnimation } from '@podlove/utils/helper'

import select from 'store/selectors'

import TranscriptEntry from './Entry'

export default {
  components: {
    TranscriptEntry
  },
  props: {
    transcripts: {
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
        searchResults: select.transcripts.searchResults,
        searchQuery: select.transcripts.searchQuery,
        fontCi: select.theme.fontCi,
        fontBold: select.theme.fontBold
      })
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
    }
  },
  mounted() {
    this.$nextTick(() => {
      const entries = [...this.$el.children].map(asyncAnimation((entry) => entry.clientHeight))

      Promise.all(entries).then((resolved) => {
        this.$emit('load', resolved)
      })
    })
  }
}
</script>
