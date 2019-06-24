<template lang="pug">
  div#tab-share(class="mobile:p-4 tablet:p-6")
    tab-title(@close="closeTab") {{ $t('SHARE.TITLE') }}
    div.mb-4.block.items-center.justify-between(class="tablet:flex")
      playtime.mx-2.mb-4(class="tablet:mx-0 tablet:mb-0")
      channels
    embed-code.mb-4

</template>

<script>
import { toggleTab } from '@podlove/player-actions/tabs'
import store from 'store'

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
  methods: {
    closeTab() {
      store.dispatch(toggleTab('share'))
    }
  }
}
</script>
