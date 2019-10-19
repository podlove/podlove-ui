<template lang="pug">
  span.truncate(:aria-label="a11y" tabindex="0" v-if="title" data-test="current-chapter") {{ title }}
</template>

<script>
import { prop } from 'ramda'
import { mapState } from 'redux-vuex'
import select from 'store/selectors'

export default {
  data: mapState({
    currentGhostChapter: select.ghost.chapter,
    currentChapter: select.chapters.current,
    ghost: select.ghost.time
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
    },
    a11y() {
      return this.$t('A11Y.TIMER_CHAPTER', this.chapter)
    }
  }
}
</script>
