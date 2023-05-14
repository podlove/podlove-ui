<template>
  <tooltip
    trigger="click"
    :content="$t('MESSAGES.COPIED')"
    :color="state.color"
    :background="state.background"
    placement="right"
    @click="copyLink"
  >
    <channel
      type="link"
      :color="state.color"
      :background="state.background"
      :filled="hover"
      @mouseover="hover = true"
      @mouseleavee="hover = false"
    />
  </tooltip>
</template>

<script>
import copy from 'copy-to-clipboard'
import { mapState } from 'redux-vuex'
import Channel from '@podlove/components/channel'
import Tooltip from '@podlove/components/tooltip'

import select from 'store/selectors'

export default {
  components: {
    Channel,
    Tooltip
  },
  setup() {
    return {
      state: mapState({
        link: select.share.link,
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
  methods: {
    copyLink() {
      copy(this.state.link)
    }
  }
}
</script>
