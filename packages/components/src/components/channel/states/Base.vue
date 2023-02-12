<script setup lang="ts">
const props = defineProps({
  type: {
    type: String,
    default: 'link',
    validator: (val: string) => ['button', 'link'].includes(val)
  },
  href: {
    type: String,
    default: null
  },
  filled: {
    type: Boolean,
    default: false
  },
  a11y: {
    type: String,
    default: ''
  },
  target: {
    type: String,
    default: '_blank'
  }
});

const componentType = props.type === 'link' ? 'a' : 'button';

</script>

<template>
  <component
    :is="componentType"
    :href="props.href"
    class="inline-flex items-center flex-col m-2 cursor-pointer"
    :target="props.target"
  >
    <span
      class="
        podlove-channel-icon
        flex
        justify-center
        items-center
        rounded
        border-2 border-transparent border-solid
      "
      aria-hidden="true"
    >
      <slot></slot>
    </span>
    <span class="sr-only">{{ props.a11y }}</span>
  </component>
</template>

<style lang="scss" scoped>
.podlove-channel-icon {
  width: 60px;
  height: 60px;
}
</style>
