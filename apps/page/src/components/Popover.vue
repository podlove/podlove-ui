<template>
  <div
    ref="popoverRef"
    class="popover bg-gray-100 z-50 shadow-md p-2 rounded"
    :class="{
      [direction]: true,
      hidden: !visible,
      block: visible,
      'opacity-0': !located,
      'opacity-100': located
    }"
    :style="style"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { delay } from '@podlove/utils/promise';
import type { Ref } from 'vue';
import { onMounted } from 'vue';
import { onUnmounted } from 'vue';
import { watch } from 'vue';
import { computed } from 'vue';
import { ref } from 'vue';

const props = defineProps<{ direction?: 'bottom' | 'right' }>();
const popoverRef: Ref<HTMLElement | null> = ref(null);

const direction = computed(() => props.direction || 'bottom');
const visible = ref(false);
const located = ref(false);
const width = ref(0);
const height = ref(0);
const parent = ref({
  x: 0,
  y: 0,
  width: 0,
  height: 0
});

const style = computed(() => {
  if (!visible.value) {
    return {}
  }

  const centerX = (width.value / 2) * -1;
  const centerY = (height.value / 2) * -1;

  switch (direction.value) {
    case 'bottom':
      return {
        top: parent.value.y + parent.value.height + 10 + 'px',
        left: parent.value.x + centerX + parent.value.width / 2 + 'px'
      };
    case 'right':
      return {
        top: parent.value.y + centerY + parent.value.height / 2 + 'px',
        left: parent.value.x + parent.value.width + 10 + 'px'
      };
    default: {
      return {};
    }
  }
});

watch(visible, async () => {
  if (!visible.value) {
    return;
  }

  await delay(10);
  width.value = popoverRef.value?.clientWidth || 0;
  height.value = popoverRef.value?.clientHeight || 0;
  parent.value = popoverRef.value?.parentElement?.getBoundingClientRect() || parent.value;
  located.value = true;
});

const showPopover = () => {
  located.value = false;
  visible.value = true;
};

const hidePopover = () => {
  located.value = false;
  visible.value = false;
};

onMounted(() => {
  popoverRef.value?.parentElement?.addEventListener('mouseover', showPopover);
  popoverRef.value?.parentElement?.addEventListener('mouseleave', hidePopover);
});

onUnmounted(() => {
  popoverRef.value?.parentElement?.removeEventListener('mouseover', showPopover);
  popoverRef.value?.parentElement?.removeEventListener('mouseleave', hidePopover);
});
</script>

<style>
.popover {
  position: fixed;
}

.popover:before {
  display: block;
  position: absolute;
  width: 0;
  height: 0;
  content: '';
}

.popover.bottom:before {
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid #fff;
  top: -6px;
  left: calc(50% - 6px);
  filter: drop-shadow(0px -2px 2px rgba(52, 73, 94, 0.1));
}

.popover.top:before {
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #fff;
  bottom: -6px;
  left: calc(50% - 6px);
  filter: drop-shadow(0px 2px 2px rgba(52, 73, 94, 0.1));
}

.popover.left:before {
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-left: 6px solid #fff;
  right: -6px;
  top: calc(50% - 6px);
  filter: drop-shadow(2px 0px 2px rgba(52, 73, 94, 0.1));
}

.popover.right:before {
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-right: 6px solid #fff;
  left: -6px;
  top: calc(50% - 6px);
  filter: drop-shadow(-2px 0px 2px rgba(52, 73, 94, 0.1));
}
</style>
