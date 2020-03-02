<template>
  <div v-if="install">
    <div class="mb-4">
      {{ $t('FINISH_SCREEN.REDIRECT_MESSAGE') }}
      <a :href="link" :style="{ color }" class="underline" rel="noopener" target="_blank">
        {{ $t('FINISH_SCREEN.REDIRECT_LINK') }}
      </a>
    </div>
    <div v-if="install && os === 'ios'">
      <div class="mb-4">
        {{ $t('FINISH_SCREEN.DOWNLOAD_APP') }}
      </div>
      <app-store-icon></app-store-icon>
    </div>
    <div v-if="install && os === 'android'">
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
      :href="feed"
      :style="{ color }"
      class="underline mb-6 block truncate"
      rel="noopener"
      :title="feed"
      target="_blank"
    >
      {{ feed }}
    </a>
    <tooltip
      trigger="click"
      :content="$t('MESSAGES.COPIED')"
      :color="alt"
      :background="color"
      placement="top"
      @click="copyLink"
    >
      <button
        class="py-2 px-4 rounded-sm text-sm"
        :style="{ background: color, color: alt, ...font }"
      >
        {{ $t('FINISH_SCREEN.COPY_URL') }}
      </button>
    </tooltip>
  </div>
</template>

<script>
import copy from 'copy-to-clipboard'
import Tooltip from '@podlove/components/tooltip'
import { mapState } from 'redux-vuex'
import * as select from 'store/selectors'

import AppStoreIcon from '../icons/AppStore'
import PlayStoreIcon from '../icons/PlayStore'

export default {
  components: {
    Tooltip,
    AppStoreIcon,
    PlayStoreIcon
  },
  data: mapState({
    color: select.theme.brand,
    alt: select.theme.alt,
    link: select.finish.link,
    install: select.finish.install,
    os: select.finish.os,
    rss: select.finish.rss,
    font: select.theme.fontBold,
    feed: select.feed
  }),
  methods: {
    copyLink() {
      copy(this.feed)
    }
  }
}
</script>
