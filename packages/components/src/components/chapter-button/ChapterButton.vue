<script setup lang="ts">
import { nextChapter, previousChapter } from '@podlove/player-actions/chapters';
import NextIcon from '../icons/Next.vue';
import PreviousIcon from '../icons/Previous.vue';

const props = defineProps<{
  type: 'next' | 'previous';
}>();

const emit = defineEmits(['next', 'previous']);

const icon = {
  next: NextIcon,
  previous: PreviousIcon
}

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
    <component :is="icon[props.type]" />
    <slot />
  </button>
</template>

<style lang="postcss">
.podlove-component-chapter-button {
  --podlove-component--icon--color: var(
    --podlove-component--chapter-button--color,
    var(--podlove-components-text)
  );
}
</style>
