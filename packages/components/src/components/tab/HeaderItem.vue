<template>
  <li
    class="
      podlove-component-tab-header-item
      flex
      items-center
      justify-center
      w-full
      m-0
      opacity-100
      hover:opacity-75
      h-8
    "
    :class="{ active, [display]: true }"
    role="presentation"
    :rel="name"
  >
    <button
      :data-test="`podlove-component-tab-header-item-trigger-${name}`"
      class="
        flex
        items-center
        justify-center
        overflow-hidden
        pt-0
        pb-0
        pl-4
        pr-4
        align-middle
        text-center
        w-full
        h-full
      "
      role="tab"
      :aria-controls="name"
      :aria-selected="active"
      :tabindex="index"
      @click="clickHandler"
    >
      <span class="icon mr-1" aria-hidden="true"><slot name="icon" /></span>
      <span class="uppercase ml-1"><slot name="title" /></span>
      <icon v-if="active" class="hidden" aria-hidden="true" />
    </button>
  </li>
</template>

<script lang="ts" setup>
import Icon from '../icons/Close.vue';

defineProps({
  index: {
    type: Number,
    default: 0
  },
  name: {
    type: String,
    default: ''
  },
  active: {
    type: Boolean,
    default: false
  },
  display: {
    type: String,
    default: 'native'
  }
});

const emits = defineEmits(['click']);

const clickHandler = () => {
  emits('click');
};
</script>

<style lang="postcss" scoped>
.podlove-component-tab-header-item {
  transition: all 300ms;
  --podlove-component--icon--color: var(
    --podlove-component--header-item--color-active,
    var(--podlove-components-background)
  );
}

.podlove-component-tab-header-item .icon {
  line-height: 0;
  fill: var(--podlove-component--tab-header-item--color, var(--podlove-components-text));
}

.podlove-component-tab-header-item.active .icon {
  fill: var(--podlove-component--tab-header-item--color-active, var(--podlove-components-background));
}

.podlove-component-tab-header-item.active {
  @apply hover:opacity-100;

  color: var(--podlove-component--tab-header-item--color-active, var(--podlove-components-background));
  background: var(
    --podlove-component--tab-header-item--background-active,
    var(--podlove-components-text)
  );
}

.podlove-component-tab-header-item,
.podlove-component-tab-header-item.embed {
  color: var(--podlove-component--tab-header-item--color, var(--podlove-components-text));
  background: var(--podlove-component--tab-header-item--background, var(--podlove-components-background));
}

.podlove-component-tab-header-item.embed {
  @apply hover:opacity-100;
}
</style>
