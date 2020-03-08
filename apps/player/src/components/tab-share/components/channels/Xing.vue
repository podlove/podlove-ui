<template lang="pug">
  channel(type="xing" :link="link" :color="color" :background="background" :filled="hover" @mouseover.native="hover = true" @mouseleave.native="hover = false")
</template>

<script>
import Channel from '@podlove/components/channel'

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
        playtime: select.playtime,
        color: select.theme.brandDark,
        background: select.theme.alt
      })
    }
  }
}
</script>
