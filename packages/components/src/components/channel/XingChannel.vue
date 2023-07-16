<template>
  <channel type="link" channel="xing" :a11y="$props.a11y" :href="xingLink">
    <xing-icon :filled="$props.filled" />
  </channel>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { addQueryParameter } from '@podlove/utils/url';
import Channel from './components/Channel.vue';
import XingIcon from '../icons/Xing.vue';

const LINK = 'https://www.xing.com/spi/shares/new';

const props = defineProps<{
  a11y?: string;
  link: string | null;
  filled?: boolean;
}>();

const xingLink = computed(() => addQueryParameter(LINK, { url: props.link }));
</script>
