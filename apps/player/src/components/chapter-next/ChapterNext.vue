<template lang="pug">
  chapter-button(v-if="chapterButtons" type="next" :disabled="nextChapterDisabled" :color="color" @click="dispatch" :title="$t(title.key, title.attr)" data-test="chapter-next")
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
    nextChapterDisabled: select.components.nextChapterDisabled,
    chapterButtons: select.components.chapterButtons,
    color: select.theme.brandDark,
    title: select.accessibility.chapterNext
  }),
  methods: {
    dispatch: store.dispatch
  }
}
</script>
