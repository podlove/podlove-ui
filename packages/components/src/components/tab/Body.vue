<template>
  <div
    class="podlove-component-tab-body overflow-hidden"
    :class="{
      'active overflow-y-auto': active,
      'fixed-height absolute top-0 left-0 w-full overflow-x-hidden': fixed
    }"
    role="tabpanel"
    :aria-labelledby="`trigger-${name}`"
    tabindex="0"
    :aria-hidden="!active"
    :data-test="`tab-content-${name}`"
  >
    <div class="tab-content">
      <slot tabindex="0" />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  active: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    default: ''
  },
  fixed: {
    type: Boolean,
    default: false
  }
});
</script>

<style lang="postcss" scoped>
.podlove-component-tab-body {
  max-height: 0;
  background: var(--podlove-components-background);
}

.podlove-component-tab-body .tab-content {
  background: var(--podlove-component--tab-body--background, var(--podlove-components-background));
}

.podlove-component-tab-body.active {
  max-height: 100%;
}

.podlove-component-tab-body.fixed-height {
  height: calc(100% - 35px);
}
</style>
