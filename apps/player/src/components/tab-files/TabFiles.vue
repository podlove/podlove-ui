<template>
  <div clcass="w-full mobile:p-4 tablet:p-6" data-test="tab-files">
    <tab-title tab="files" @close="closeTab">
      {{ $t('FILES.TITLE') }}
    </tab-title>
    <div class="tablet:flex tablet:flex-1 tablet:flex-wrap w-full">
      <file
        v-for="(file, index) in state.files"
        :key="index"
        :file="file"
        class="mb-4 tablet:w-1/2 mobile:mb-4 mobile:block"
      />
    </div>
  </div>
</template>

<script>
import { mapState, injectStore } from 'redux-vuex'
import { toggleTab } from '@podlove/player-actions/tabs'

import select from 'store/selectors'

import TabTitle from '../tab-title'
import File from './components/File'

export default {
  components: { TabTitle, File },
  setup() {
    return {
      state: mapState({
        files: select.files.files
      }),
      dispatch: injectStore().dispatch
    }
  },
  methods: {
    closeTab() {
      this.dispatch(toggleTab('files'))
    }
  }
}
</script>
