<template>
  <span
    v-if="state.title"
    class="truncate"
    :aria-label="$t(state.label.key, state.label.attr)"
    tabindex="0"
    data-test="current-chapter"
    :style="{ color: state.color }"
  >
    {{ state.title }}
  </span>
</template>

<script>
import { prop } from 'ramda'
import { mapState } from 'redux-vuex'
import select from 'store/selectors'

export default {
  setup() {
    return {
      state: mapState({
        currentGhostChapter: select.ghost.chapter,
        currentChapter: select.chapters.current,
        ghost: select.ghost.time,
        color: select.theme.contrast,
        label: select.accessibility.currentChapter
      })
    }
  },
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
