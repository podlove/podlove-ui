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

<script lang="ts" setup>
import { mapState, injectStore } from 'redux-vuex';
import { toggleTab } from '@podlove/player-actions/tabs';
import select from '../../store/selectors/index.js';

import TabTitle from '../tab-title/TabTitle.vue';
import Channels from './components/Channels.vue';
import Playtime from './components/Playtime.vue';
import EmbedCode from './components/Embed.vue';

const state = mapState({
  hasEmbedLink: select.share.hasEmbedLink,
  sharePlaytime: select.components.sharePlaytime
});
const dispatch = injectStore().dispatch;

const closeTab = () => {
  dispatch(toggleTab('share'));
};
</script>
