<template lang="pug">
  div.files-tab#tab-files
    card(:headerColor="cardHeader.background" :backgroundColor="cardBody")
      span.files-header(:style="headerStyle" slot="header") {{ $t('FILES.TYPES.AUDIO.HEADER') }}
      div
        file(v-for="(file, index) in audio" :file="file" :key="index" icon="audio-file")
</template>

<script>
import { mapState } from 'redux-vuex'

import { Card } from '@podlove/components'
import select from 'store/selectors'

import File from './components/File'

export default {
  data: mapState({
    cardHeader: select.styles.cardHeader,
    cardBody: select.styles.cardBody,
    audio: select.files.audio
  }),
  components: {
    Card,
    File
  },
  computed: {
    headerStyle () {
      return {
        color: this.cardHeader.color
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/variables';

.files-tab {
  padding: $padding * 1.5;
}
</style>
