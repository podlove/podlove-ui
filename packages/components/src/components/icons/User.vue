<script lang="ts" setup>
import Icon from './components/Icon.vue';

defineProps({
  size: {
    type: Number,
    default: 28
  },
  filled: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <icon :width="size" :height="size" viewBox="0 0 28 28">
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
      :fill="filled ? 'currentColor' : 'transparent'"
    />
  </icon>
</template>
