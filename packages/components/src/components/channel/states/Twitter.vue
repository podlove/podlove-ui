<template>
  <channel-base v-bind="$props" type="link" :href="twitterLink">
    <icon type="twitter" :filled="filled" />
  </channel-base>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { addQueryParameter } from '@podlove/utils/url';
import ChannelBase from './Base.vue';
import Icon from '../../icons/Icon.vue';

const LINK = 'https://twitter.com/intent/tweet';

const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  filled: {
    type: Boolean,
    default: false
  }
});

const twitterLink = computed(() => addQueryParameter(LINK, { text: props.text }));
</script>
