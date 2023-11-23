<template>
  <span class="flex justify-center items-center" aria-hidden="true">
    <icon :size="size" />
    <slot />
  </span>
</template>

<script setup lang="ts">
import Icon from '../../icons/Play.vue';

defineProps({
  size: {
    type: Number,
    default: 25
  }
});
</script>

<style lang="scss" scoped></style>
