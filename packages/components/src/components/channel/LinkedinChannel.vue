<template>
  <channel type="link" channel="linkedin" :a11y="$props.a11y" :href="linkedinLink">
    <LinkedinIcon :filled="$props.filled" />
  </channel>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { addQueryParameter } from '@podlove/utils/url';
import Channel from './components/Channel.vue';
import LinkedinIcon from '../icons/Linkedin.vue';

const LINK = 'https://www.linkedin.com/shareArticle';

const props = defineProps<{
  link: string | null;
  text: string;
  a11y?: string | null;
  filled?: boolean;
}>();

const linkedinLink = computed(() =>
  addQueryParameter(LINK, { url: props.link, mini: true, summary: props.text })
);
</script>
