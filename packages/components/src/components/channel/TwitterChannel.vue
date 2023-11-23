<template>
  <channel type="link" channel="twitter" :a11y="$props.a11y" :href="twitterLink">
    <twitter-icon :filled="$props.filled" />
  </channel>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { addQueryParameter } from '@podlove/utils/url';
import Channel from './components/Channel.vue';
import TwitterIcon from '../icons/Twitter.vue';

const LINK = 'https://twitter.com/intent/tweet';

const props = defineProps<{
  text: string | null;
  a11y?: string;
  filled?: boolean;
}>();

const twitterLink = computed(() => addQueryParameter(LINK, { text: props.text }));
</script>
