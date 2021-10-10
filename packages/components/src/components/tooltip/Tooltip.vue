<template>
  <span>
    <dropdown
      :auto-hide="true"
      :placement="placement"
      :triggers="[]"
      :shown="visible"
      :offset="[0, 10]"
      theme="dropdown"
    >
      <span @click="click" @mouseleave="mouseLeave" @mouseover="mouseOver">
        <slot />
      </span>
      <template #popper>
        <span class="rounded px-3 py-1 text-center text-sm" :style="{ color, background }">
          {{ content }}
        </span>
        <span
          class="dropdown-arrow"
          :class="{ [`arrow-${placement}`]: true }"
          :style="{ 'border-color': background }"
        ></span>
      </template>
    </dropdown>
  </span>
</template>

<script>
import { Dropdown } from 'v-tooltip'

let hideTimeout

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
      visible: false,
      test: 'orange'
    }
  },

  methods: {
    show() {
      this.visible = true
    },

    hide(timeout) {
      clearTimeout(hideTimeout)
      hideTimeout = setTimeout(() => {
        this.visible = false
      }, timeout)
    },

    mouseLeave() {
      this.hide(500)
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
      this.hide(3000)
    }
  }
}
</script>

<style lang="scss">
.v-popper__arrow-container {
  display: none;
}

.v-popper--theme-dropdown {
  display: inline-block;
  position: relative;

  .resize-observer {
    display: none;
  }
}

.dropdown-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  z-index: 1;

  &.arrow-top {
    margin-bottom: 8px;
    border-width: 5px 5px 0 5px;
    border-left-color: transparent !important;
    border-right-color: transparent !important;
    border-bottom-color: transparent !important;
    bottom: -5px;
    left: calc(50% - 5px);
    margin-left: 0;
    margin-top: 0;
    margin-bottom: 0;
  }

  &.arrow-bottom {
    border-width: 0 5px 5px 5px;
    border-left-color: transparent !important;
    border-right-color: transparent !important;
    border-top-color: transparent !important;
    top: -5px;
    left: calc(50% - 5px);
    margin-left: 0;
    margin-top: 0;
    margin-bottom: 0;
  }

  &.arrow-right {
    border-width: 5px 5px 5px 0;
    border-left-color: transparent !important;
    border-top-color: transparent !important;
    border-bottom-color: transparent !important;
    left: -5px;
    top: calc(50% - 5px);
    margin-left: 0;
    margin-top: 1px;
    margin-right: 0;
  }

  &.arrow-left {
    border-width: 5px 0 5px 5px;
    border-top-color: transparent !important;
    border-right-color: transparent !important;
    border-bottom-color: transparent !important;
    right: -5px;
    top: calc(50% - 5px);
    margin-left: 0;
    margin-top: 1px;
    margin-right: 0;
  }
}
</style>
