<template>
  <li class="tab-header-item" :style="tabStyle" :class="{ active }" role="presentation" :rel="name">
    <button
      class="caption"
      role="tab"
      :id="`trigger-${name}`"
      :aria-controls="name"
      :aria-selected="active"
      :tabindex="index"
      @click="clickHandler"
    >
      <span class="icon" :style="iconStyle" aria-hidden="true"><slot name="icon"></slot></span>
      <span class="title"><slot name="title"></slot></span>
      <icon type="close" class="close" :color="iconColor(true)" v-if="active" aria-hidden="true" />
    </button>
  </li>
</template>

<script>
import { color, background } from 'defaults'
import Icon from '../icons'

export default {
  props: {
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
    },
    color: {
      type: String,
      default: color
    },
    background: {
      type: String,
      default: background
    },
    colorActive: {
      type: String,
      default: background
    },
    backgroundActive: {
      type: String,
      default: color
    }
  },
  computed: {
    tabStyle () {
      const style = {
        color: this.color,
        background: this.background
      }

      if (this.active) {
        style.color = this.colorActive
        style.background = this.backgroundActive
      }

      if (this.display === 'embed') {
        style.color = this.color
        style.background = this.background
      }

      return style
    },
    iconStyle () {
      return {
        fill: this.iconColor(this.active)
      }
    }
  },
  methods: {
    iconColor (active) {
      let color = this.color

      if (active) {
        color = this.colorActive
      }

      if (this.display === 'embed') {
        color = this.color
      }

      return color
    },

    clickHandler () {
      this.$emit('click')
    }
  },
  components: {
    Icon
  }
}
</script>

<style lang="scss" scoped>
@import 'boot';
@import 'resets';
@import 'font';

@import 'tokens/defaults';
@import 'tokens/tab';
@import 'tokens/animation';

button {
  @extend %button;
}

.tab-header-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0;
  height: $tabs-header-height;
  transition: all $animation-duration;
  opacity: 1;

  &:hover {
    opacity: 0.8;
  }

  &.active:hover {
    opacity: 1;
  }

  .caption {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 ($padding / 2);

    overflow: hidden;
    vertical-align: middle;
    text-align: center;
    width: 100%;
    height: 100%;
  }

  .title {
    @extend %font;
    margin-left: $margin / 3;
    text-transform: uppercase;
  }

  .icon {
    margin-right: $margin / 3;
    line-height: 0;
  }

  .close {
    display: none;
  }
}
</style>
