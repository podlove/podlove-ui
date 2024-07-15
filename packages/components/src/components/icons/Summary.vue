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
    viewBox="0 0 100 100"
  >
  <path
      fill="currentColor"
      d="M50,11c21.5,0,39,17.5,39,39S71.5,89,50,89S11,71.5,11,50S28.5,11,50,11 M50,5C25.1,5,5,25.1,5,50s20.1,45,45,45  c24.9,0,45-20.1,45-45S74.9,5,50,5L50,5z M53,70.2V45.4c0-1.7-1.3-3-3-3s-3,1.3-3,3v24.8c0,1.7,1.3,3,3,3S53,71.8,53,70.2z M50,27.2  c-2.2,0-4,1.8-4,4s1.8,4,4,4s4-1.8,4-4S52.2,27.2,50,27.2z"
    />
  </icon>
</template>
