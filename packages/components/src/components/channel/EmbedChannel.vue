<template>
  <channel type="button" channel="embed" :a11y="$props.a11y">
    <embed-icon />
  </channel>
</template>

<script setup lang="ts">
import Channel from './components/Channel.vue'
import EmbedIcon from '../icons/Embed.vue'

defineProps<{
  a11y?: string | null
}>()
</script>
