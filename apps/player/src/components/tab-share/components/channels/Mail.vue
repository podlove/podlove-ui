<template>
  <channel
    type="mail"
    :text="shareText"
    :subject="shareSubject"
    :color="state.color"
    :background="state.background"
    :filled="hover"
    @mouseover.native="hover = true"
    @mouseleave.native="hover = false"
  />
</template>

<script>
import { mapState } from 'redux-vuex'
import Channel from '@podlove/components/channel'
import { toHumanTime } from '@podlove/utils/time'

import select from 'store/selectors'

export default {
  components: {
    Channel
  },
  setup() {
    return {
      state: mapState({
        content: select.share.content,
        link: select.share.link,
        episodeTitle: select.episode.title,
        playtime: select.playtime,
        color: select.theme.brandDark,
        background: select.theme.alt
      })
    }
  },
  data() {
    return {
      hover: false
    }
  },
  computed: {
    shareText() {
      if (this.state.content === 'time') {
        return this.$t('SHARE.EPISODE.TEXT.PLAYTIME', {
          title: this.state.episodeTitle,
          link: this.state.link,
          playtime: toHumanTime(this.state.playtime)
        })
      }

      return this.$t('SHARE.EPISODE.TEXT.BEGINNING', {
        title: this.state.episodeTitle,
        link: this.state.link
      })
    },
    shareSubject() {
      if (this.state.content === 'time') {
        return this.$t('SHARE.EPISODE.SUBJECT.PLAYTIME', {
          title: this.state.episodeTitle,
          playtime: toHumanTime(this.state.playtime)
        })
      }

      return this.$t('SHARE.EPISODE.SUBJECT.BEGINNING', {
        title: this.state.episodeTitle
      })
    }
  }
}
</script>
