<template>
  <channel type="link" channel="link" :href="$props.link" :a11y="$props.a11y" :target="null">
    <link-icon :filled="$props.filled" />
  </channel>
</template>

<script lang="ts" setup>
import Channel from './components/Channel.vue';
import LinkIcon from '../icons/Link.vue';

defineProps<{
  filled?: boolean;
  a11y?: string;
  link: string | null;
}>();
</script>
