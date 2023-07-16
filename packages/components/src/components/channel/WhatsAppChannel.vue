<template>
  <channel type="link" channel="whats-app" :a11y="$props.a11y" :href="whatsAppLink">
    <whats-app-icon :filled="filled" />
  </channel>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { addQueryParameter } from '@podlove/utils/url';
import Channel from './components/Channel.vue';
import WhatsAppIcon from '../icons/WhatsApp.vue';

const LINK = 'whatsapp://send';

const props = defineProps<{
  text: string | null;
  a11y?: string;
  filled?: boolean;
}>();

const whatsAppLink = computed(() => addQueryParameter(LINK, { text: props.text }));
</script>
