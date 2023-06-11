<template>
  <channel-base v-bind="$props" type="link" icon="link" :target="null">
    <icon type="link" :filled="filled" />
  </channel-base>
</template>

<script lang="ts" setup>
import ChannelBase from './Base.vue';
import Icon from '../../icons/Icon.vue';

defineProps({
  filled: {
    type: Boolean,
    default: false
  }
});
</script>
