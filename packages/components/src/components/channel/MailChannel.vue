<template>
  <channel type="link" channel="mail" :a11y="$props.a11y" :href="mailLink">
    <mail-icon :filled="$props.filled" />
  </channel>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { queryParameter } from '@podlove/utils/url';
import Channel from './components/Channel.vue';
import MailIcon from '../icons/Mail.vue';

const LINK = 'mailto:';

const props = defineProps<{
  text: string;
  subject: string;
  filled?: boolean;
  a11y?: string | null;
}>();

const mailLink = computed(
  () => `${LINK}?${queryParameter({ body: props.text, subject: props.subject })}`
);
</script>
