<template>
  <channel type="link" channel="pinterest" :a11y="$props.a11y" :href="pinterestLink">
    <pinterest-icon :filled="$props.filled" />
  </channel>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { addQueryParameter } from '@podlove/utils/url';
import Channel from './components/Channel.vue';
import PinterestIcon from '../icons/Pinterest.vue';

const LINK = 'https://pinterest.com/pin/create/bookmarklet/';

const props = defineProps<{
  link: string | null;
  text: string | null;
  poster: string | null;
  a11y?: string | null;
  filled?: boolean;
}>();

const pinterestLink = computed(() =>
  addQueryParameter(LINK, {
    url: props.link,
    media: props.poster,
    is_video: false,
    description: props.text
  })
);
</script>
