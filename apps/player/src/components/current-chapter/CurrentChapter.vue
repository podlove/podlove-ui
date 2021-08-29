<template>
  <span
    v-if="title"
    class="truncate"
    :aria-label="$t(state.label.key, state.label.attr)"
    tabindex="0"
    data-test="current-chapter"
    :style="{ color: state.color }"
  >
    {{ title }}
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
      if (this.state.ghost) {
        return this.state.currentGhostChapter
      }

      return this.state.currentChapter
    },
    title() {
      return prop('title', this.chapter)
    }
  }
}
</script>
