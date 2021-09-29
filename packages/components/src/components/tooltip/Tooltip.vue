<template>
  <v-popover
    ref="popover"
    class="tooltip"
    :auto-hide="true"
    :placement="placement"
    trigger="manual"
    delay.show="100"
    delay.hide="3000"
  >
    <span @click="click" @mouseleave="mouseLeave" @mouseover="mouseOver">
      <slot />
    </span>
    <template slot="popover">
      <span class="tooltip-inner" :style="{ color, background }">
        {{ content }}
      </span>
    </template>
  </v-popover>
</template>

<script>
import { VPopover } from 'v-tooltip'

export default {
  components: {
    VPopover
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

  methods: {
    show() {
      this.$refs.popover.$refs.popover.style.color = this.background
      this.$refs.popover.show()
    },

    hide() {
      this.$refs.popover.hide()
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
@import 'boot';
@import 'tokens/color';
@import 'font';

.tooltip {
  z-index: 10000;
  font-size: 0.9em;

  .tooltip-inner {
    border-radius: 3px;
    padding: 5px 10px 4px;
    text-align: center;
  }

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
