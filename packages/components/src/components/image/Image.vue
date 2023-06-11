<script lang="ts" setup>
import { ref } from 'vue';

defineProps<{ url: string; alt?: string }>();

const emit = defineEmits(['load', 'error']);

const loaded = ref(false);
const error = ref(false);

const loadHandler = (event: Event) => {
  loaded.value = true;
  emit('load', event);
};

const errorHandler = (event: Event) => {
  error.value = true;
  emit('error', event);
};
</script>

<template>
  <div class="relative">
    <transition name="fade">
      <div
        v-if="!loaded"
        class="podlove-component-image-cover absolute top-0 left-0 w-full h-full"
      ></div>
    </transition>
    <img
      v-if="url && !error"
      class="max-h-full w-auto"
      :class="{ 'h-0': !loaded }"
      :src="url"
      :alt="alt"
      @error="errorHandler"
      @load="loadHandler"
    />
  </div>
</template>

<style lang="postcss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 600ms;
  opacity: 1;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.podlove-component-image-cover {
  background-color: var(--podlove-component-image-background, var(--podlove-components-background));
}
</style>
