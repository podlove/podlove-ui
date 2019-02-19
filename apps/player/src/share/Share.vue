<template lang="pug">
  div.share-tab#tab-share
    div.content-select
      share-content-component(@onSelect="onContentSelect()")

    //- div.channel-select(:style="sectionStyle")
    //-   span.label {{ $t('SHARE.SHARE_CHANNEL') }}
    //-   share-channels-component(:type="content" ref="channels")

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

  import ShareChannelsComponent from './ShareChannels'
  import ShareContentComponent from './ShareContent'
  import ShareLinkComponent from './ShareLink'

  import ShareEmbedComponent from './ShareEmbed'

  export default {
    data: mapState({
      sectionStyle: select.styles.shareSectionStyle,

      share: 'share',
      show: 'show',
      episode: 'episode',
      reference: 'reference',
      content: selectShareContent
    }),
    computed: {
      showLink () {
        const hasShowLink = this.content === 'show' && this.show.link
        const hasShareLink = this.content !== 'show' && this.episode.link
        return hasShowLink || hasShareLink
      },
      showEmbed () {
        return this.content !== 'show' && ((this.reference.config && this.reference.share) || this.reference.origin)
      }
    },
    methods: {
      onContentSelect () {
        head(this.$refs.channels.$el.querySelectorAll('a')).focus()
      }
    },
    components: {
      ShareContentComponent,
      ShareChannelsComponent,
      ShareEmbedComponent,
      ShareLinkComponent
    }
  }
</script>

<style lang="scss">
  @import '~styles/variables';

  .share-tab {
    padding: $padding 0 0 0;

    .title {
      font-weight: 500;
      margin: ($margin / 2) 0 $margin 0;
    }
  }

  .content-select {
    padding: $padding $padding 0 $padding;
  }

  .channel-select {
    padding: $padding ($padding * 2) ($padding * 2) $padding;
    text-align: center;

    .label {
      display: block;
      font-weight: 400;
    }
  }

  .channel-share {
    padding: $padding 0
  }
</style>
