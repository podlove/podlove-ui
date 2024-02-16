<script lang="ts" setup>
import Icon from './components/Icon.vue';

defineProps({
  size: {
    type: Number,
    default: 40
  }
});
</script>

<template>
  <icon :width="size" :height="size" viewBox="0 0 100 100">
    <g fill="currentColor">
      <polygon points="55 35 70 50 55 65 55 35" />
      <polygon points="30 35 45 50 30 65 30 35" />
    </g>
  </icon>
</template>
