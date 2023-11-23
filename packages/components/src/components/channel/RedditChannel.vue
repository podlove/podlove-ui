<template>
  <channel type="link" channel="reddit" :a11y="$props.a11y" :href="redditLink">
    <reddit-icon :filled="$props.filled" />
  </channel>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { addQueryParameter } from '@podlove/utils/url';
import Channel from './components/Channel.vue';
import RedditIcon from '../icons/Reddit.vue';

const LINK = 'http://reddit.com/submit';

const props = defineProps<{
  text: string | null;
  link: string | null;
  filled?: boolean;
  a11y?: string;
}>();

const redditLink = computed(() => addQueryParameter(LINK, { url: props.link, title: props.text }));
</script>
