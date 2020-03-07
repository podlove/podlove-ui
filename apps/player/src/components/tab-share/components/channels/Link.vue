<template lang="pug">
  tooltip(trigger="click" :content="$t('MESSAGES.COPIED')" @click="copyLink" :color="color" :background="background")
    channel(type="link" :color="color" :background="background" :filled="hover" @mouseover.native="hover = true" @mouseleave.native="hover = false")
</template>

<script>
import copy from 'copy-to-clipboard'
import Channel from '@podlove/components/channel'
import Tooltip from '@podlove/components/tooltip'

import select from 'store/selectors'

export default {
  components: {
    Channel,
    Tooltip
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
  },
  methods: {
    copyLink() {
      copy(this.link)
    }
  }
}
</script>
