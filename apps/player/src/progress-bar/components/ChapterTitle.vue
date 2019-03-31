<template lang="pug">
  div.chapter-title#progress-bar--chapter-title
    span.title(:aria-label="a11y" tabindex="0" :style="chapterStyle" v-if="chapter") {{ chapter.title }}
</template>

<script>
import { mapState } from 'redux-vuex'
import select from 'store/selectors'

export default {
  data: mapState({
    chapterStyle: select.styles.chapterTitle,
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
    a11y() {
      return this.$t('A11Y.TIMER_CHAPTER', this.chapter)
    }
  }
}
</script>

<style lang="scss" scoped>
.timer-chapter {
  width: 100%;
  text-align: center;

  .title {
    white-space: nowrap;
    display: inline-block;
  }
}
</style>
