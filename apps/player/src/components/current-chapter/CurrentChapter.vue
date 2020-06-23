<template lang="pug">
  span.truncate(:aria-label="$t(label.key, label.attr)" tabindex="0" v-if="title" data-test="current-chapter" :style="{ color }") {{ title }}
</template>

<script>
import { prop } from 'ramda'
import { mapState } from 'redux-vuex'
import select from 'store/selectors'

export default {
  data: mapState({
    currentGhostChapter: select.ghost.chapter,
    currentChapter: select.chapters.current,
    ghost: select.ghost.time,
    color: select.theme.contrast,
    label: select.accessibility.currentChapter
  }),
  computed: {
    chapter() {
      if (this.ghost) {
        return this.currentGhostChapter
      }

      return this.currentChapter
    },
    title() {
      return prop('title', this.chapter)
    }
  }
}
</script>
