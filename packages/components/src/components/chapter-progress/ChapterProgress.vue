<script setup lang="ts">
import { disableGhost, enableGhost } from '@podlove/player-actions/progress';
import { setChapter } from '@podlove/player-actions/chapters';
import { simulatePlaytime, requestPlaytime } from '@podlove/player-actions/timepiece';
import { requestPlay } from '@podlove/player-actions/play';
import type { PodloveWebPlayerChapter } from '@podlove/types';

import LinkIcon from '../icons/Link.vue';
import Timer from '../timer/Timer.vue';
import { computed, ref } from 'vue';
import { toInt } from '@podlove/utils/helper';

const props = defineProps<{
  chapter: PodloveWebPlayerChapter & { linkTitle?: string };
  showLink?: boolean;
  playtime?: number;
  ghost?: number;
}>();

const emit = defineEmits(['chapter', 'play', 'playtime', 'ghost', 'simulate', 'hover']);
const ghost = computed(() => props.ghost || 0);
const playtime = computed(() => props.playtime || 0);
const start = computed(() => toInt(props.chapter.start));
const end = computed(() => toInt(props.chapter.end));

const progressContainer = ref<HTMLElement>();

// computed
const progress = (time: number) => `${((time - start.value) * 100) / (end.value - start.value)}%`;

const progressActive = computed(() => props.chapter.active && (props?.playtime || 0) < end.value);
const ghostActive = computed(() => ghost.value > start.value && ghost.value < end.value);

const progressWidth = computed(() => progress(props.playtime));
const ghostWidth = computed(() => progress(props.ghost));

const remainingTime = computed(() => {
  if (props.chapter.active) {
    return end.value - playtime.value;
  }

  if (ghostActive.value) {
    return end.value - props.ghost;
  }

  return end.value - start.value;
});

const hasLink = computed(() => props.chapter.href && props.showLink);

// methods
const hoverPlaytime = (event: MouseEvent): number | null => {
  if (!progressContainer.value) {
    return null;
  }
  const clientRect = progressContainer.value?.getBoundingClientRect();
  return (
    start.value + ((end.value - start.value) * (event.clientX - clientRect.left)) / clientRect.width
  );
};

const progressClick = () => {
  emit('chapter', setChapter(props.chapter.index));
  emit('play', requestPlay());
  return false;
};

const contextProgressClick = (event: MouseEvent) => {
  emit('playtime', requestPlaytime(hoverPlaytime(event)));
  emit('play', requestPlay());
  event.preventDefault();
  return false;
};

const progressOut = () => {
  emit('ghost', disableGhost());
};

const progressMove = (event: MouseEvent) => {
  emit('ghost', enableGhost());

  emit('simulate', simulatePlaytime(hoverPlaytime(event)));
};

const linkOver = () => {
  emit('hover', true);
};

const linkLeave = () => {
  emit('hover', false);
};
</script>

<template>
  <div
    class="podlove-component-chapter-progress relative flex items-center px-2 py-0"
    ref="progressContainer"
    aria-hidden="true"
    @mouseout="progressOut"
    @mousemove.alt="progressMove"
    @click.exact="progressClick"
    @click.alt="contextProgressClick"
  >
    <span
      class="pointer-events-none w-[calc(100%-4.4em)]"
      aria-hidden="true"
      v-html="chapter.title"
    >
    </span>
    <span v-if="hasLink" class="flex max-w-[40%]">
      <link-icon class="flex-shrink-0 -mt-[2px]" />
      <a
        class="font-medium whitespace-nowrap"
        :href="chapter.href"
        target="_blank"
        @mouseover="linkOver"
        @mouseleave="linkLeave"
      >
        {{ chapter.linkTitle }}
      </a>
    </span>
    <timer
      class="block text-right pointer-events-none pr-2 min-w-[4.4em]"
      :time="remainingTime"
      :remaining="(chapter.active || !!ghostActive) && playtime > 0"
    />
    <span
      class="absolute left-0 bottom-0 pointer-events-none h-[3px]"
      :class="{
        'podlove-component-chapter-progress-bar': progressActive,
        'podlove-component-chapter-ghost-bar': ghostActive
      }"
      aria-hidden="true"
    />
  </div>
</template>

<style lang="postcss" scoped>
.podlove-component-chapter-progress-bar {
  background-color: var(
    --podlove-component--chapter-progress--background,
    var(--podlove-components-background)
  );
  width: v-bind('progressWidth');
}

.podlove-component-chapter-ghost-bar {
  background-color: var(
    --podlove-component--chapter-progress--ghost--background,
    var(--podlove-components-highlight)
  );
  width: v-bind('ghostWidth');
}
</style>
