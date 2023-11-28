<template>
  <div class="podlove-subscribe-button--finish-card" v-if="state.install">
    <div class="mb-4">
      {{ t('FINISH_SCREEN.REDIRECT_MESSAGE') }}
      <a
        :href="state.link"
        :aria-label="t('A11Y.DOWNLOAD_APP')"
        class="underline"
        rel="noopener"
        target="_blank"
      >
        {{ t('FINISH_SCREEN.REDIRECT_LINK') }}
      </a>
    </div>
    <div v-if="state.install && state.os === 'ios'">
      <div class="mb-4">
        {{ t('FINISH_SCREEN.DOWNLOAD_APP') }}
      </div>
      <app-store-icon></app-store-icon>
    </div>
    <div v-if="state.install && state.os === 'android'">
      <div class="mb-4">
        {{ t('FINISH_SCREEN.DOWNLOAD_APP') }}
      </div>
      <play-store-icon></play-store-icon>
    </div>
  </div>
  <div class="podlove-subscribe-button--finish-card" v-else>
    <div class="mb-4">
      {{ t('FINISH_SCREEN.COPY_MESSAGE') }}
    </div>
    <a
      :href="state.feed"
      class="underline mb-6 block truncate"
      rel="noopener"
      :aria-label="t('A11Y.FEED')"
      target="_blank"
    >
      {{ state.feed }}
    </a>
    <tooltip
      trigger="click"
      :content="t('MESSAGES.COPIED')"
      placement="top"
      @click="copyLink"
    >
      <button
        :title="t('A11Y.COPY_FEED')"
        class="podlove-subscribe-button--finish-card--tooltip-button py-2 px-4 rounded-sm text-sm font-bold"
      >
        {{ t('FINISH_SCREEN.COPY_URL') }}
      </button>
    </tooltip>
  </div>
</template>

<script lang="ts" setup>
import { Tooltip } from '@podlove/components';
import copy from '@podlove/utils/copy';
import { mapState } from 'redux-vuex';
import { useI18n } from 'vue-i18n';

import * as select from '../../store/selectors.js';
import AppStoreIcon from '../icons/AppStore.vue';
import PlayStoreIcon from '../icons/PlayStore.vue';

const { t } = useI18n();

const state = mapState({
  link: select.finish.link,
  install: select.finish.install,
  os: select.finish.os,
  rss: select.finish.rss,
  feed: select.feed
});

const copyLink = () => {
  copy(state.feed);
};
</script>

<style lang="postcss" scoped>
.podlove-subscribe-button--finish-card {
  --podlove-component--tooltip--color: var(--podlove-subscribe-button--finish-card--tooltip--color);
  --podlove-component--tooltip--background: var(--podlove-subscribe-button--finish-card--tooltip--background);
}

.podlove-subscribe-button--finish-card--tooltip-button {
  color: var(--podlove-subscribe-button--finish-card--tooltip-button--color);
  background: var(--podlove-subscribe-button--finish-card--tooltip-button--background);
}
</style>
