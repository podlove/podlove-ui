<template>
  <component
    :is="componentType"
    class="inline-flex items-center flex-col m-2 cursor-pointer"
    @click="clickHandler"
  >
    <span
      class="
        podlove-component--channel
        flex
        justify-center
        items-center
        rounded
        border-2 border-transparent border-solid
        w-[60px]
        h-[60px]
      "
      aria-hidden="true"
    >
      <slot></slot>
    </span>
    <span v-if="$props.a11y" class="sr-only">{{ $props.a11y }}</span>
  </component>
</template>

<script setup lang="ts">
import { selectChannel } from '@podlove/player-actions/share';
import { PodloveWebPlayerChannel } from '@podlove/types';

const props = defineProps<{
  type: 'button' | 'link';
  channel: PodloveWebPlayerChannel;
  a11y?: string;
}>();

const emit = defineEmits(['click']);

const clickHandler = () => {
  emit('click', selectChannel(props.channel as PodloveWebPlayerChannel));
};

const componentType = props.type === 'link' ? 'a' : 'button';
</script>
<style lang="postcss" scoped>
.podlove-component--channel {
  --podlove-component--icon--color: var(
    --podlove-component--channel--color,
    var(--podlove-components-text)
  );
  background-color: var(
    --podlove-component--channel--background,
    var(--podlove-components-background)
  );
}
</style>
