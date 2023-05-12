<template>
  <div v-if="state.install">
    <div class="mb-4">
      {{ $t('FINISH_SCREEN.REDIRECT_MESSAGE') }}
      <a
        :href="state.link"
        :aria-label="$t('A11Y.DOWNLOAD_APP')"
        class="underline"
        rel="noopener"
        target="_blank"
      >
        {{ $t('FINISH_SCREEN.REDIRECT_LINK') }}
      </a>
    </div>
    <div v-if="state.install && state.os === 'ios'">
      <div class="mb-4">
        {{ $t('FINISH_SCREEN.DOWNLOAD_APP') }}
      </div>
      <app-store-icon></app-store-icon>
    </div>
    <div v-if="state.install && state.os === 'android'">
      <div class="mb-4">
        {{ $t('FINISH_SCREEN.DOWNLOAD_APP') }}
      </div>
      <play-store-icon></play-store-icon>
    </div>
  </div>
  <div v-else>
    <div class="mb-4">
      {{ $t('FINISH_SCREEN.COPY_MESSAGE') }}
    </div>
    <a
      :href="state.feed"
      class="underline mb-6 block truncate"
      rel="noopener"
      :aria-label="$t('A11Y.FEED')"
      target="_blank"
    >
      {{ state.feed }}
    </a>
    <tooltip
      trigger="click"
      :content="$t('MESSAGES.COPIED')"
      :color="state.alt"
      :background="state.color"
      placement="top"
      @click="copyLink"
    >
      <button
        :title="$t('A11Y.COPY_FEED')"
        class="py-2 px-4 rounded-sm text-sm"
        :style="{ background: state.color, color: state.alt, ...state.font }"
      >
        {{ $t('FINISH_SCREEN.COPY_URL') }}
      </button>
    </tooltip>
  </div>
</template>

<script lang="ts" setup>
import { Tooltip } from '@podlove/components';
import copy from '@podlove/utils/copy';
import { mapState } from 'redux-vuex';

import * as select from '../../store/selectors';
import AppStoreIcon from '../icons/AppStore';
import PlayStoreIcon from '../icons/PlayStore';

const state = mapState({
  color: select.theme.brand,
  alt: select.theme.alt,
  link: select.finish.link,
  install: select.finish.install,
  os: select.finish.os,
  rss: select.finish.rss,
  font: select.theme.fontBold,
  feed: select.feed
});

const copyLink = () => {
  copy(state.feed);
};
</script>
