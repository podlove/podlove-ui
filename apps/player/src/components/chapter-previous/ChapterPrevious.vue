<template lang="pug">
  chapter-button(v-if="chapterButtons" type="previous" :disabled="previousChapterDisabled" :color="color" @click="dispatch" data-test="chapter-previous")
</template>

<script>
import { mapState } from 'redux-vuex'
import store from 'store'

import select from 'store/selectors'

import PlayButton from '@podlove/components/play-button'
import ChapterButton from '@podlove/components/chapter-button'
import StepperButton from '@podlove/components/stepper-button'

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
