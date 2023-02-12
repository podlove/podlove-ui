<script setup lang="ts">
import { nextChapter, previousChapter } from '@podlove/player-actions/chapters';
import Icon from '../icons';

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (val: string) => ['next', 'previous'].includes(val)
  }
});

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
  <button class="podlove-chapter-button" :id="`chapter-button--${props.type}`" @click="clickHandler">
    <icon :type="props.type" />
    <slot />
  </button>
</template>

<style lang="postcss">
.podlove-chapter-button {
  --podlove-component-icon-color: var(
    --podlove-component-chapter-button-color,
    var(--podlove-components-text)
  );
}
</style>
