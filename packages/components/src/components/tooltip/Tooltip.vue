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
        <span class="podlove-component-tooltip rounded px-3 py-1 text-center text-sm">
          {{ content }}
        </span>
        <span
          class="dropdown-arrow"
          :class="{ [`arrow-${placement}`]: true }"
        ></span>
      </template>
    </dropdown>
  </span>
</template>

<script lang="ts" setup>
import { Dropdown } from 'v-tooltip';
import { ref } from 'vue';
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
  placement: {
    type: String,
    default: 'auto',
    validator: (pos: string) => ['auto', 'top', 'right', 'bottom', 'left'].includes(pos)
  }
});

const emits = defineEmits(['click']);
const visible = ref(false);

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
  hide(500);
};

const mouseOver = () => {
  if (!props.content) {
    return;
  }

  if (props.trigger !== 'hover') {
    return;
  }

  show();
};

const click = () => {
  if (!props.content) {
    return;
  }

  if (props.trigger !== 'click') {
    return;
  }

  show();
  emits('click');
  hide(3000);
};
</script>

<style lang="scss">
.podlove-component-tooltip {
  color: var(--podlove-component-tooltip-color, var(--podlove-components-text));
  background: var(--podlove-component-tooltip-background, var(--podlove-components-background));
}

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
  border-color: var(--podlove-component-tooltip-background, var(--podlove-components-background));

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
