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
    <rect x="2.5" y="4.5" width="19" height="15" rx="1" stroke="currentColor" />
    <path
      d="M9.55 15.1101V8.88992L15.7702 12L9.55 15.1101Z"
      stroke="currentColor"
      stroke-width="1.1"
      stroke-linejoin="round"
    />
  </icon>
</template>
