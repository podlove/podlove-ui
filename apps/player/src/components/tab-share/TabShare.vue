<template lang="pug">
  div(class="mobile:p-4 tablet:p-6" data-test="tab-share")
    tab-title(@close="closeTab") {{ $t('SHARE.TITLE') }}
    div.mb-4.block.items-center.justify-between(class="tablet:flex")
      channels
    div.mx-2.mb-4
      playtime.mx-2.mb-4(class="tablet:mx-0 tablet:mb-0")
    embed-code.mx-2.mb-4(v-if="hasEmbedLink")

</template>

<script>
import { mapState } from 'redux-vuex'
import { toggleTab } from '@podlove/player-actions/tabs'
import store from 'store'
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
  data: mapState({
    hasEmbedLink: select.share.hasEmbedLink
  }),
  methods: {
    closeTab() {
      store.dispatch(toggleTab('share'))
    }
  }
}
</script>
