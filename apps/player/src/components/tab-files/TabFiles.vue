<template lang="pug">
  div.w-full(class="mobile:p-4 tablet:p-6" data-test="tab-files")
    tab-title(@close="closeTab") {{ $t('FILES.TITLE') }}
    div(class="tablet:flex tablet:flex-1 tablet:flex-wrap w-full")
      file.mb-4(v-for="(file, index) in audio" :file="file" :type="$t('FILES.TYPES.AUDIO')" :key="index" class="tablet:w-1/2")

</template>

<script>
import { mapState } from 'redux-vuex'
import { toggleTab } from '@podlove/player-actions/tabs'
import store from 'store'
import select from 'store/selectors'

import TabTitle from '../tab-title'
import File from './components/File'

export default {
  components: { TabTitle, File },
  data: mapState({
    audio: select.files.audio
  }),
  methods: {
    closeTab() {
      store.dispatch(toggleTab('files'))
    }
  }
}
</script>
