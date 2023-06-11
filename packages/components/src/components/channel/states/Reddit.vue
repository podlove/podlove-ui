<template>
  <channel-base v-bind="$props" type="link" :href="redditLink">
    <icon type="reddit" :filled="filled" />
  </channel-base>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { addQueryParameter } from '@podlove/utils/url';
import ChannelBase from './Base.vue';
import Icon from '../../icons/Icon.vue';

const LINK = 'http://reddit.com/submit';

const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  link: {
    type: String,
    default: null
  },
  filled: {
    type: Boolean,
    default: false
  }
});

const redditLink = computed(() => addQueryParameter(LINK, { url: props.link, title: props.text }));
</script>
