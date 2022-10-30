<template>
  <channel-base type="button" v-bind="$props">
    <icon type="embed" :color="color" />
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
      default: 'transparent'
    }
  }
}
</script>
