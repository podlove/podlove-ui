<template lang="pug">
  chapter-button(v-if="chapterButtons" type="previous" :disabled="previousChapterDisabled" :color="color" @click="dispatch")
</template>

<script>
import { mapState } from 'redux-vuex'
import store from 'store'

import select from 'store/selectors'
import { PlayButton, ChapterButton, StepperButton } from '@podlove/components'

export default {
  components: {
    PlayButton,
    ChapterButton,
    StepperButton
  },
  data: mapState({
    previousChapterDisabled: select.components.previousChapterDisabled,
    chapterButtons: select.components.chapterButtons,
    color: select.theme.brandDark
  }),
  methods: {
    dispatch: store.dispatch
  }
}
</script>
