<template>
  <div class="mobile:p-4 tablet:p-6" data-test="tab-share">
    <tab-title tab="share" @close="closeTab">
      {{ $t('SHARE.TITLE') }}
    </tab-title>
    <div class="mb-4 block items-center justify-between tablet:flex">
      <channels />
    </div>
    <div v-if="state.sharePlaytime" class="mx-2 mb-4">
      <playtime class="mx-2 mb-4 tablet:mx-0 tablet:mb-0" />
    </div>
    <embed-code v-if="state.hasEmbedLink" class="mx-2 mb-4" />
  </div>
</template>

<script>
import { mapState, injectStore } from 'redux-vuex'
import { toggleTab } from '@podlove/player-actions/tabs'
import select from 'store/selectors'

import TabTitle from '../tab-title'
import Channels from './components/Channels'
import Playtime from './components/Playtime'
import EmbedCode from './components/Embed'

export default {
  components: {
    TabTitle,
    Channels,
    Playtime,
    EmbedCode
  },
  setup() {
    return {
      state: mapState({
        hasEmbedLink: select.share.hasEmbedLink,
        sharePlaytime: select.components.sharePlaytime
      }),
      dispatch: injectStore().dispatch
    }
  },
  methods: {
    closeTab() {
      this.dispatch(toggleTab('share'))
    }
  }
}
</script>
