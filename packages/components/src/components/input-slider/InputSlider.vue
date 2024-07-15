<script lang="ts" setup>
import { computed } from 'vue';
import { path } from 'ramda';
import { round } from '@podlove/utils/math';

const pinRange = 0.01;

const props = defineProps({
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  },
  step: {
    type: Number,
    default: 0.1
  },
  value: {
    type: Number,
    default: 0
  },
  pins: {
    type: Array<{value: number, label: string}>,
    default: () => []
  }
});

const emit = defineEmits(['sliderInput', 'sliderChange', 'sliderDblclick'])

const relativePosition = (current: any = 0, minimum: any = 0, maximum: any = 0) =>
  ((parseFloat(current) - parseFloat(minimum)) * 100) /
    (parseFloat(maximum) - parseFloat(minimum)) +
  '%';

const thumbLeft = computed(() => relativePosition(props.value, props.min, props.max));

const calcValue = (event: Event) => {
      const value = path(['target','value'], event) as number;

      return (
        props.pins
          .map(({value}) => value)
          .find((pin) => pin + pinRange >= value && pin - pinRange <= value) || value
      );
    };

const handleInput = (event: Event) => {
  emit('sliderInput', calcValue(event));
};

const handleChange = (event: Event) => {
  emit('sliderChange', calcValue(event));
};

const handleDblclick = (event: Event) => {
  emit('sliderDblclick', path(['target','value'], event));
};
</script>

<template>
  <div class="podlove-component--input-slider w-full relative h-[30px]">
    <input
      type="range"
      :min="min"
      :max="max"
      :value="value"
      :step="step"
      @input="handleInput"
      @change="handleChange"
      @dblclick="handleDblclick"
    />
    <span
      class="track block w-full absolute left-0 pointer-events-none top-[50%] h-[2px] rounded-sm"
    />
    <span
      v-for="(pin, index) in pins"
      :key="index"
      class="pin block absolute font-medium text-xs text-center -top-[10px] w-[30px] -ml-[15px]"
      :style="{ left: `${round(pin.value * 100)}%` }"
    >
      {{ pin.label }}
    </span>
    <span
      class="
        thumb
        absolute
        border border-solid
        pointer-events-none
        rounded-lg
        top-[calc(50%-4px)]
        h-[10px]
        w-[10px]
        -ml-[7.5px]
      "
    />
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@import '../../styles/range.scss';

.podlove-component--input-slider .thumb {
  left: v-bind('thumbLeft');
  background-color: var(
    --podlove-component--input-slider--thumb-color,
    var(--podlove-components-background)
  );
  border-color: var(
    --podlove-component--input-slider--border-color,
    var(--podlove-components-text)
  );
}

.podlove-component--input-slider .track {
  background-color: var(
    --podlove-component--input-slider--progress-color,
    var(--podlove-components-text)
  );
}

.podlove-component--input-slider {
  @include range($progress-height, $thumb-width-desktop, $thumb-width-desktop-hover);
}
</style>
