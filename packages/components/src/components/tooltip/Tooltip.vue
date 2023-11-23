<template>
  <span
    class="relative overflow-visible"
    ref="rootElement"
    @click="click"
    @mouseleave="mouseLeave"
    @mouseover="mouseOver"
  >
    <slot />
    <span
      ref="tooltipElement"
      class="podlove-component--tooltip absolute block text-center rounded p-1 whitespace-nowrap"
      :class="{ hidden: !visible, [$props.placement]: true }"
      :style="{ top, left, bottom, right }"
    >
      {{ content }}
      <slot name="content"></slot>
      <span v-if="showArrow" class="tooltip-arrow"></span>
    </span>
  </span>
</template>

<script lang="ts" setup>
import { nextTick, ref, watch } from 'vue';
import { prop } from 'ramda';
let hideTimeout: any;

const props = defineProps({
  trigger: {
    type: String,
    default: 'hover'
  },
  content: {
    type: String,
    default: ''
  },
  autohide: {
    type: Boolean,
    default: true
  },
  showArrow: {
    type: Boolean,
    default: true
  },
  placement: {
    type: String,
    default: 'auto',
    validator: (pos: string) => ['top', 'right', 'bottom', 'left'].includes(pos)
  }
});

const emits = defineEmits(['click']);
const visible = ref(false);
const rootElement = ref<HTMLElement | null>(null);
const tooltipElement = ref<HTMLElement | null>(null);
const top = ref(null);
const left = ref(null);
const bottom = ref(null);
const right = ref(null);

const show = () => {
  visible.value = true;
};

const hide = (timeout: number) => {
  clearTimeout(hideTimeout);
  hideTimeout = setTimeout(() => {
    visible.value = false;
  }, timeout);
};

const mouseLeave = () => {
  if (!props.autohide) {
    return;
  }

  hide(500);
};

const mouseOver = () => {
  if (props.trigger !== 'hover') {
    return;
  }

  show();
};

const click = () => {
  if (props.trigger !== 'click') {
    return;
  }

  show();
  emits('click');

  if (props.autohide) {
    hide(3000);
  }
};

const clickOutside = (event: Event) => {
  const target = prop('target', event) as HTMLElement;
  const containsTarget = (elem: HTMLElement) => {
    if (!elem) {
      return false;
    }

    return elem.contains(target);
  }

  if (containsTarget(tooltipElement.value) || containsTarget(rootElement.value)) {
    return;
  }

  hide(10);
};

watch(visible, async () => {
  await nextTick();

  const root = rootElement.value.getBoundingClientRect();
  const tooltip = tooltipElement.value.getBoundingClientRect();

  switch (props.placement) {
    case 'bottom':
      top.value = root.height + 15 + 'px';
      right.value = 'inherit';
      bottom.value = 'inherit';
      left.value = (root.width - tooltip.width) / 2 + 'px';
      break;

    case 'top':
      top.value = 'inherit';
      right.value = 'inherit';
      bottom.value = root.height + 15 + 'px';
      left.value = (root.width - tooltip.width) / 2 + 'px';
      break;

    case 'left':
      top.value = (root.height - tooltip.height) / 2 + 'px';
      right.value = root.width + 15 + 'px';
      left.value = 'inherit';
      bottom.value = ((root.height - tooltip.height / 2) / 2) * -1 + 'px';
      break;

    case 'right':
      top.value = (root.height - tooltip.height) / 2 + 'px';
      right.value = 'inherit';
      left.value = root.width + 15 + 'px';
      bottom.value = ((root.height - tooltip.height / 2) / 2) * -1 + 'px';
      break;
  }

  if (visible.value) {
    window.addEventListener('click', clickOutside);
  }

  if (!visible.value) {
    window.removeEventListener('click', clickOutside);
  }
});
</script>

<style lang="scss" scoped>
.podlove-component--tooltip {
  color: var(--podlove-component--tooltip--color, var(--podlove-components-text));
  background: var(--podlove-component--tooltip--background, var(--podlove-components-background));

  .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    z-index: 1;
    border-color: var(
      --podlove-component--tooltip--background,
      var(--podlove-components-background)
    );
  }

  &.top {
    .tooltip-arrow {
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
  }

  &.bottom {
    .tooltip-arrow {
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
  }

  &.right {
    .tooltip-arrow {
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
  }

  &.left {
    .tooltip-arrow {
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
}
</style>
