<template lang="pug">
  channel(type="facebook" :link="link" :color="color" :background="background" :filled="hover" @mouseover.native="hover = true" @mouseleave.native="hover = false") {{ link }}
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
        link: select.share.link,
        color: select.theme.brandDark,
        background: select.theme.alt
      })
    }
  }
}
</script>
