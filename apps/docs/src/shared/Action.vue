<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    default: null
  }
})
</script>

<template>
  <div class="w-full flex mb-2 pr-2 items-center">
    <label class="w-1/2 text-base font-semibold mr-2">{{ label }}</label>
    <div class="w-1/2 overflow-hidden">
      <slot></slot>
    </div>
  </div>
</template>
