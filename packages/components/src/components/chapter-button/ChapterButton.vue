<script setup lang="ts">
import { nextChapter, previousChapter } from '@podlove/player-actions/chapters';
import Icon from '../icons/Icon.vue';

const props = defineProps<{
  type: 'next' | 'previous';
}>();

const emit = defineEmits(['next', 'previous']);

const clickHandler = () => {
  switch (props.type) {
    case 'next':
      emit('next', nextChapter());
      break;
    case 'previous':
      emit('previous', previousChapter());
      break;
  }
};
</script>

<template>
  <button
    class="podlove-component-chapter-button"
    :data-test="`podlove-component-chapter-button--${props.type}`"
    @click="clickHandler"
  >
    <icon :type="props.type" />
    <slot />
  </button>
</template>

<style lang="postcss">
.podlove-component-chapter-button {
  --podlove-component-icon-color: var(
    --podlove-component-chapter-button-color,
    var(--podlove-components-text)
  );
}
</style>
