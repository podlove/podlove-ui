<template lang="pug">
  channel(type="pinterest" :text="shareText" :link="link" :poster="episodePoster" :color="color" :background="background" :filled="hover" @mouseover.native="hover = true" @mouseleave.native="hover = false")
</template>

<script>
import Channel from '@podlove/components/channel'
import { toHumanTime } from '@podlove/utils/time'

import select from 'store/selectors'

export default {
  components: {
    Channel
  },
  data() {
    return {
      hover: false,
      ...this.mapState({
        content: select.share.content,
        link: select.share.link,
        episodeTitle: select.episode.title,
        episodePoster: select.episode.poster,
        playtime: select.playtime,
        color: select.theme.brandDark,
        background: select.theme.alt
      })
    }
  },
  computed: {
    shareText() {
      if (this.content === 'time') {
        return this.$t('SHARE.EPISODE.TEXT.PLAYTIME', {
          title: this.episodeTitle,
          link: this.link,
          playtime: toHumanTime(this.playtime)
        })
      }

      return this.$t('SHARE.EPISODE.TEXT.BEGINNING', {
        title: this.episodeTitle,
        link: this.link
      })
    }
  }
}
</script>
