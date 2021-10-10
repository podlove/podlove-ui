<template>
  <label v-if="label" class="flex">
    <span class="mr-2 relative inline-block w-5 h-5 border rounded-sm border-solid" :style="style">
      <icon
        v-if="value"
        class="check-mark absolute pointer-events-none -mr-2 -mt-2"
        :size="16"
        type="check-mark"
        :color="color"
      ></icon>
      <input
        type="checkbox"
        class="opacity-0"
        :checked="value"
        :disabled="disabled"
        @change="selectEvent"
      />
    </span>
    <span class="h-5 leading-5" data-test="input-checkbox--label">{{ label }}</span>
  </label>
  <span v-else class="relative inline-block w-5 h-5 border rounded-sm border-solid" :style="style">
    <icon
      v-if="value"
      class="check-mark absolute pointer-events-none -mr-2 -mt-2"
      :size="16"
      type="check-mark"
      :color="color"
    ></icon>
    <input
      type="checkbox"
      class="opacity-0"
      :checked="value"
      :disabled="disabled"
      @change="selectEvent"
    />
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
  emits: {
    select: null
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
    selectEvent(event) {
      this.$emit('select', event.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.check-mark {
  top: 50%;
  left: 50%;
  margin-left: -8px;
  margin-top: -8px;
}
</style>
