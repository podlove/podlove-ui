<template>
  <channel-base v-bind="$props" type="link" icon="link" :target="null">
    <icon type="link" :filled="filled" />
  </channel-base>
</template>

<script>
import ChannelBase from './Base'
import Icon from '../../icons'

export default {
  components: {
    Icon,
    ChannelBase
  },
  props: {
    filled: {
      type: Boolean,
      default: false
    }
  }
}
</script>
