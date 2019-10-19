<template>
  <label v-if="label" class="input-checkbox">
    <span class="checkbox" :style="style">
      <icon v-if="value" class="check-mark" :size="16" type="check-mark" :color="color"></icon>
      <input type="checkbox" :checked="value" :disabled="disabled" @change="changeEvent" />
    </span>
    <span class="label">{{ label }}</span>
  </label>
  <span v-else class="checkbox" :style="style">
    <icon v-if="value" class="check-mark" :size="16" type="check-mark" :color="color"></icon>
    <input type="checkbox" :checked="value" :disabled="disabled" @change="changeEvent" />
  </span>
</template>

<script>
import * as defaultColors from 'defaults'
import Icon from '../icons'

export default {
  components: {
    Icon
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    background: {
      type: String,
      default: defaultColors.color
    },
    color: {
      type: String,
      default: defaultColors.background
    },
    borderColor: {
      type: String,
      default: defaultColors.background
    },
    label: {
      type: String,
      default: null
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    style() {
      return {
        background: this.background,
        'border-color': this.borderColor
      }
    }
  },
  methods: {
    changeEvent(event) {
      this.$emit('change', event.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'boot';
@import 'tokens/defaults';
@import 'tokens/input';

.input-checkbox {
  display: flex;

  .checkbox {
    margin-right: $margin / 2;
  }

  .label {
    height: 20px;
    line-height: 20px;
  }
}

.checkbox {
  display: inline-block;
  width: 20px;
  height: 20px;
  position: relative;
  border-radius: 2px;
  border-width: 1px;
  border-style: solid;

  .check-mark {
    position: absolute;
    pointer-events: none;
    top: 50%;
    left: 50%;
    margin-left: -8px;
    margin-top: -8px;
  }

  input[type='checkbox'] {
    opacity: 0;
  }
}
</style>
