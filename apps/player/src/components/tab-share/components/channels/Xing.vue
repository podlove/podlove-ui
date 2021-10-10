<template>
  <channel
    type="xing"
    :link="state.link"
    :color="state.color"
    :background="state.background"
    :filled="hover"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  />
</template>

<script>
import { mapState } from 'redux-vuex'
import Channel from '@podlove/components/channel'

import select from 'store/selectors'

export default {
  components: {
    Channel
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
  }
}
</script>
