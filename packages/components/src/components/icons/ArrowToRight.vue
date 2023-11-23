<script lang="ts" setup>
import Icon from './components/Icon.vue';

defineProps({
  size: {
    type: Number,
    default: 12
  }
});
</script>


<template>
  <icon
    :width="size"
    :height="size"
    viewBox="0 0 12 12"
  >
    <path
      d="M4.33301 2.66663L7.66634 5.99996L4.33301 9.33329"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </icon>
</template>
