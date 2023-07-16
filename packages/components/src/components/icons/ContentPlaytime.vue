<script lang="ts" setup>
import Icon from './components/Icon.vue';

defineProps({
  size: {
    type: Number,
    default: 20
  }
});
</script>

<template>
  <icon
    :width="size"
    :height="size"
    viewBox="0 0 20 20"
    ratio="1"
  >
    <polygon fill="none" stroke="currentColor" stroke-width="1.1" points="8.5 7 13.5 10 8.5 13" />
    <circle fill="none" stroke="currentColor" stroke-width="1.1" cx="10" cy="10" r="9" />
  </icon>
</template>
