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
    <circle
      cx="12"
      cy="12"
      r="11.45"
      stroke="currentColor"
      stroke-width="1.1"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8 7.84227C8 7.46274 8.40624 7.22158 8.73943 7.40332L16.3619 11.5611C16.7094 11.7506 16.7094 12.2494 16.3619 12.4389L8.73942 16.5967C8.40624 16.7784 8 16.5373 8 16.1577V7.84227Z"
      fill="currentColor"
    />
  </icon>
</template>
