<template>
  <label v-if="label" class="flex">
    <span
      class="podlove-check-mark mr-2 relative inline-block w-5 h-5 border rounded-sm border-solid"
    >
      <icon
        v-if="value"
        class="top-[50%] left-[0%] -ml-2 -mt-2 absolute pointer-events-none"
        :size="16"
        type="check-mark"
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
  <span
    v-else
    class="podlove-check-mark relative inline-block w-5 h-5 border rounded-sm border-solid"
  >
    <icon
      v-if="value"
      class="top-[50%] left-[0%] -ml-2 -mt-2 absolute pointer-events-none"
      :size="16"
      type="check-mark"
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
import * as defaultColors from '../../defaults';
import Icon from '../icons/Icon';

export default {
  components: {
    Icon
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
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
      };
    }
  },
  methods: {
    selectEvent(event) {
      this.$emit('select', event.target.value);
    }
  }
};
</script>

<style lang="scss" scoped>
.podlove-check-mark {
  --podlove-component-icon-color: var(
    --podlove-component-checkbox-color,
    var(--podlove-components-background)
  );

  background: var(--podlove-component-checkbox-background, var(--podlove-components-text));

  border-color: var(--podlove-component-checkbox-border, var(--podlove-components-background));
}
</style>
