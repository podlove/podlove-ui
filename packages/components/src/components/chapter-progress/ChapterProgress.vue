<script setup lang="ts">
import { disableGhost, enableGhost } from '@podlove/player-actions/progress';
import { setChapter } from '@podlove/player-actions/chapters';
import { simulatePlaytime, requestPlaytime } from '@podlove/player-actions/timepiece';
import { requestPlay } from '@podlove/player-actions/play';

import Icon from '../icons';
import Timer from '../timer';
import { computed, ref } from 'vue';

const props = defineProps({
  chapter: {
    type: Object,
    default: () => ({
      start: 0,
      end: 0,
      title: '',
      href: null,
      linkTitle: null,
      active: false
    })
  },
  showLink: {
    type: Boolean,
    default: false
  },
  playtime: {
    type: Number,
    default: 0
  },
  ghost: {
    type: Number,
    default: 0
  }
});

const emit = defineEmits(['chapter', 'play', 'playtime', 'ghost', 'simulate', 'hover']);

const progressContainer = ref<HTMLElement>();

// computed
const progress = (time: number) =>
  `${((time - props.chapter.start) * 100) / (props.chapter.end - props.chapter.start)}%`;

const progressActive = computed(() => props.chapter.active && props.playtime < props.chapter.end);
const ghostActive = computed(
  () => props.ghost && props.ghost > props.chapter.start && props.ghost < props.chapter.end
);

const progressWidth = computed(() => progress(props.playtime))
const ghostWidth = computed(() => progress(props.ghost))

const remainingTime = computed(() => {
  if (props.chapter.active) {
    return props.chapter.end - props.playtime;
  }

  if (ghostActive) {
    return props.chapter.end - props.ghost;
  }

  return props.chapter.end - props.chapter.start;
});

const hasLink = computed(() => props.chapter.href && props.showLink);

// methods
const hoverPlaytime = (event: MouseEvent): number | null => {
  if (!progressContainer.value) {
    return null;
  }
  const clientRect = progressContainer.value?.getBoundingClientRect();
  return (
    props.chapter.start +
    ((props.chapter.end - props.chapter.start) * (event.clientX - clientRect.left)) /
      clientRect.width
  );
};

const progressClick = () => {
  emit('chapter', setChapter(props.chapter.index - 1));
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
    <span class="pointer-events-none w-[calc(100%-4.4em)]" aria-hidden="true">
      {{ chapter.title }}
    </span>
    <span v-if="hasLink" class="flex max-w-[40%]">
      <icon class="flex-shrink-0 -mt-[2px]" type="link" />
      <a
        class="font-medium whitespace-no-wrap"
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
      class="
        absolute
        left-0
        bottom-0
        pointer-events-none
        h-[3px]
      "
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
    --podlove-component-chapter-progress-background,
    var(--podlove-components-background)
  );
  width: v-bind('progressWidth');
}

.podlove-component-chapter-ghost-bar {
  background-color: var(
    --podlove-component-chapter-ghost-background,
    var(--podlove-components-highlight)
  );
  width: v-bind('ghostWidth');
}
</style>
