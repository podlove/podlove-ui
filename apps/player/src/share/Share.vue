<template lang="pug">
  div.share-tab#tab-share
    content-select.content-select

    div.share-channel(:style="sectionStyle")
      span.label {{ $t('SHARE.SHARE_CHANNEL') }}
      channel-select

    div.share-link#tab-share--link(v-if="hasLink")
      span.label {{ $t('SHARE.SHARE_LINK') }}
      copy-link

    div.share-embed#tab-share--embed--link(v-if="hasEmbedLink")
      span.label {{ $t('SHARE.EMBED.TITLE') }}
      embed-code
</template>

<script>
import { mapState } from 'redux-vuex'
import select from 'store/selectors'

import ContentSelect from './components/Content'
import ChannelSelect from './components/Channels'
import CopyLink from './components/Link'
import EmbedCode from './components/Embed'

export default {
  components: {
    ContentSelect,
    ChannelSelect,
    CopyLink,
    EmbedCode
  },
  data: mapState({
    sectionStyle: select.styles.shareSectionStyle,
    hasLink: select.share.hasLink,
    content: select.share.content,
    hasEmbedLink: select.share.hasEmbedLink
  })
}
</script>

<style lang="scss" scoped>
@import '~styles/variables';

.share-tab {
  padding: $padding 0;

  .title {
    font-weight: 500;
    margin: ($margin / 2) 0 $margin 0;
  }

  .content-select {
    padding: $padding $padding $padding * 2 $padding;
  }

  .share-channel {
    padding: $padding;
  }

  .share-link,
  .share-embed {
    padding: $padding $padding * 2 0 $padding * 2;
  }

  .label {
    display: block;
    font-weight: 400;
    margin-bottom: $margin / 2;
    text-align: center;
  }
}
</style>
