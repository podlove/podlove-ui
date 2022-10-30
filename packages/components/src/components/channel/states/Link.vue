<template>
  <channel-base v-bind="$props" type="link" icon="link" :target="null">
    <icon type="link" :color="color" :filled="filled" />
  </channel-base>
</template>

<script>
import ChannelBase from './Base'
import Icon from '../../icons/Icon'

export default {
  components: {
    Icon,
    ChannelBase
  },
  props: {
    color: {
      type: String,
      default: '#fff'
    },
    filled: {
      type: Boolean,
      default: false
    }
  }
}
</script>
