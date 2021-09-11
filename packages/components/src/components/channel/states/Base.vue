<template>
  <span>
    <component
      :is="componentType"
      :href="link"
      class="inline-flex items-center flex-col m-2 cursor-pointer"
      :target="target"
    >
      <span
        :style="iconStyle"
        class="
          channel-icon
          flex
          justify-center
          items-center
          rounded
          border-2 border-transparent border-solid
        "
        aria-hidden="true"
      >
        <slot />
      </span>
      <span class="sr-only">{{ a11y }}</span>
    </component>
  </span>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'link',
      validator: (val) => ['button', 'link'].includes(val)
    },
    link: {
      type: String,
      default: null
    },
    background: {
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
  },
  computed: {
    iconStyle() {
      return {
        'background-color': this.background
      }
    },
    componentType() {
      switch (this.type) {
        case 'link':
          return 'a'
        default:
          return 'button'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.channel-icon {
  width: 60px;
  height: 60px;
}
</style>
