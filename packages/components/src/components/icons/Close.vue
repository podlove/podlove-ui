<script lang="ts" setup>
import Icon from './components/Icon.vue';

defineProps({
  size: {
    type: Number,
    default: 24
  }
});
</script>

<template>
  <icon
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
  >
    <path
      d="M18 18L6.00003 6M18 6L6.00003 18"
      stroke="currentColor"
      stroke-width="1.3"
      stroke-linecap="round"
    />
  </icon>
</template>
