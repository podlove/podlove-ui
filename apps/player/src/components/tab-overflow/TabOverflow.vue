<template>
  <div
    class="podlove-player--tab-overflow absolute w-full bottom-0 inset-x-0 pointer-events-none"
    data-test="tab-overflow"
  >
    <div class="h-4 mx-4" data-test="tab-overflow--shadow"></div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="postcss" scoped>
.podlove-player--tab-overflow {
  background-image: linear-gradient(
    var(--podlove-player--tab-overflow--start),
    var(--podlove-player--tab-overflow--stop)
  );
}
</style>
