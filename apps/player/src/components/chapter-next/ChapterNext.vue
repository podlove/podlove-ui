<template>
  <chapter-button
    v-if="state.chapterButtons"
    data-test="chapter-next"
    type="next"
    :disabled="state.nextChapterDisabled"
    :color="state.color"
    :title="$t(state.title.key, state.title.attr)"
    @click="dispatch"
  />
</template>

<script>
import { mapState, injectStore } from 'redux-vuex'

import select from 'store/selectors'
import ChapterButton from '@podlove/components/chapter-button'

export default {
  components: {
    ChapterButton
  },
  setup() {
    return {
      state: mapState({
        nextChapterDisabled: select.components.nextChapterDisabled,
        chapterButtons: select.components.chapterButtons,
        color: select.theme.brandDark,
        title: select.accessibility.chapterNext
      }),
      dispatch: injectStore().dispatch
    }
  }
}
</script>
