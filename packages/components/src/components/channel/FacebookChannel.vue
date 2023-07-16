<template>
  <channel type="link" channel="facebook" :href="facebookLink" :a11y="$props.a11y">
    <facebook-icon :filled="$props.filled" />
  </channel>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { addQueryParameter } from '@podlove/utils/url';
import Channel from './components/Channel.vue';
import FacebookIcon from '../icons/Facebook.vue';

const LINK = 'https://www.facebook.com/sharer/sharer.php';

const props = defineProps<{ link: string | null; filled: boolean; a11y?: string | null }>();

const facebookLink = computed(() => addQueryParameter(LINK, { u: props.link }));
</script>
