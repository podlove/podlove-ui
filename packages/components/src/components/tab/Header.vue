<template>
  <ul
    class="
      podlove-component-tab-header
      relative
      w-full
      flex
      items-center
      justify-center
      font-hairline
      h-8
    "
    role="tablist"
  >
    <span
      class="block absolute pointer-events-none bottom-0 left-0 right-0 h-4 z-30 -mb-4"
    />
    <slot />
  </ul>
</template>

<script lang="ts" setup></script>

<style lang="postcss" scoped>
</style>
