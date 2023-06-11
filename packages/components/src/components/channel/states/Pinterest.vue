<template>
  <channel-base v-bind="$props" type="link" :href="pinterestLink">
    <icon type="pinterest" :filled="filled" />
  </channel-base>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { addQueryParameter } from '@podlove/utils/url';
import ChannelBase from './Base.vue';
import Icon from '../../icons/Icon.vue';

const LINK = 'https://pinterest.com/pin/create/bookmarklet/';

const props = defineProps({
  link: {
    type: String,
    default: null
  },
  text: {
    type: String,
    default: ''
  },
  poster: {
    type: String,
    default: null
  },
  filled: {
    type: Boolean,
    default: false
  }
});

const pinterestLink = computed(() =>
  addQueryParameter(LINK, {
    url: props.link,
    media: props.poster,
    is_video: false,
    description: props.text
  })
);
</script>
