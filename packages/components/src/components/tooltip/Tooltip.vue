<template>
  <span>
    <dropdown :auto-hide="true" :placement="placement" :triggers="[]" :shown="visible">
      <span @click="click" @mouseleave="mouseLeave" @mouseover="mouseOver">
        <slot />
      </span>
      <template #popper>
        <span class="tooltip-inner rounded px-3 py-1 text-center" :style="{ color, background }">
          {{ content }}
        </span>
      </template>
    </dropdown>
  </span>
</template>

<script>
import { Dropdown } from 'v-tooltip'

export default {
  components: {
    Dropdown
  },

  props: {
    trigger: {
      type: String,
      default: 'hover'
    },
    content: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#fff'
    },
    background: {
      type: String,
      default: '#000'
    },
    placement: {
      type: String,
      default: 'auto',
      validator: (pos) => ['auto', 'top', 'right', 'bottom', 'left'].includes(pos)
    }
  },

  emits: {
    click: null
  },

  data() {
    return {
      visible: false
    }
  },

  methods: {
    show() {
      // this.$refs.popover.$refs.popover.style.color = this.background
      // this.$refs.popover.show()
      this.visible = true
    },

    hide() {
      // this.$refs.popover.hide()
      this.visible = false
    },

    mouseLeave() {
      this.hide()
    },

    mouseOver() {
      if (!this.content) {
        return
      }

      if (this.trigger !== 'hover') {
        return
      }

      this.show()
    },

    click() {
      if (!this.content) {
        return
      }

      if (this.trigger !== 'click') {
        return
      }

      this.show()
      this.$emit('click')
      setTimeout(() => this.hide(), 6000)
    }
  }
}
</script>

<style lang="scss">
.tooltip {
  z-index: 10000;

  .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: currentColor;
    z-index: 1;
  }

  &[x-placement^='top'] {
    margin-bottom: 8px;

    .tooltip-arrow {
      border-width: 5px 5px 0 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      bottom: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^='bottom'] {
    margin-top: 8px;

    .tooltip-arrow {
      border-width: 0 5px 5px 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-top-color: transparent !important;
      top: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^='right'] {
    margin-left: 8px;

    .tooltip-arrow {
      border-width: 5px 5px 5px 0;
      border-left-color: transparent !important;
      border-top-color: transparent !important;
      border-bottom-color: transparent !important;
      left: 5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[x-placement^='left'] {
    margin-right: 8px;

    .tooltip-arrow {
      border-width: 5px 0 5px 5px;
      border-top-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      right: 5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }
}
</style>
