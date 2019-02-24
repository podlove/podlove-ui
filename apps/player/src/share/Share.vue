<template lang="pug">
  div.share-tab#tab-share
    content-select.content-select

    div.share-channel(:style="sectionStyle")
      span.label {{ $t('SHARE.SHARE_CHANNEL') }}
      channel-select

    div.share-link#tab-share--link(v-if="hasLink")
      span.label {{ $t('SHARE.SHARE_LINK') }}
      copy-link

    //- div.share-embed()
    //-   div.channel-share#tab-share--link(v-if="showLink")
    //-     span.label {{ $t('SHARE.SHARE_LINK') }}
    //-     share-link-component(:type="content")

    //-   div.channel-share#tab-share--embed--link(v-if="showEmbed")
    //-     span.label {{ $t('SHARE.EMBED.TITLE') }}
    //-     share-embed-component(:type="content")
</template>

<script>
  import { mapState } from 'redux-vuex'
  import { head } from 'lodash'
  import select from 'store/selectors'

  import ContentSelect from './components/Content'
  import ChannelSelect from './components/Channels'
  import CopyLink from './components/Link'

  export default {
    data: mapState({
      sectionStyle: select.styles.shareSectionStyle,
      hasLink: select.share.hasLink,
      content: select.share.content
    }),
    computed: {
      // showLink () {
      //   const hasShowLink = this.content === 'show' && this.show.link
      //   const hasShareLink = this.content !== 'show' && this.episode.link
      //   return hasShowLink || hasShareLink
      // },
      // showEmbed () {
      //   return this.content !== 'show' && ((this.reference.config && this.reference.share) || this.reference.origin)
      // }
    },
    methods: {
      // onContentSelect () {
      //   head(this.$refs.channels.$el.querySelectorAll('a')).focus()
      // }
    },
    components: {
      ContentSelect,
      ChannelSelect,
      CopyLink
    }
  }
</script>

<style lang="scss" scoped>
  @import '~styles/variables';

  .share-tab {
    padding: $padding 0 0 0;

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

    .share-link {
      padding: $padding $padding * 2 $padding * 2 $padding * 2;
    }

    .label {
      display: block;
      font-weight: 400;
      margin-bottom: $margin / 2;
      text-align: center;
    }

  }
</style>
