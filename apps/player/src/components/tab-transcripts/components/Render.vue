<template>
  <div
    ref="root"
    class="overflow-auto body mobile:p-4 tablet:p-6"
    data-test="tab-transcripts--results"
    :style="{ height: heightByIndex(0, prerender.length - 1) }"
    @scroll="renderWindow()"
    @mousewheel="disableFollow()"
    @DOMMouseScroll="disableFollow()"
  >
    <div :style="{ height: heightByIndex(0, start) + 'px' }" />
    <div :style="{ height: heightByIndex(start, end) + 'px' }">
      <transcript-entry
        v-for="(entry, index) in slice(start, end)"
        :key="index"
        data-test="tab-transcripts--entry"
        :prerender="false"
        :entry="entry"
        :playtime="state.playtime"
        :search-query="state.query"
        :ghost-active="state.ghostActive"
        :ghost-time="state.ghostTime"
        :search-results="state.searchResults"
        @onClick="onClick"
        @onMouseOver="onMouseOver"
        @onMouseLeave="onMouseLeave"
      />
    </div>
    <div :style="{ height: heightByIndex(end, prerender.length - 1) + 'px' }" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { mapState, injectStore } from 'redux-vuex';
import { simulatePlaytime, requestPlaytime } from '@podlove/player-actions/timepiece';
import { requestPlay } from '@podlove/player-actions/play';
import { enableGhost, disableGhost } from '@podlove/player-actions/progress';
import { followTranscripts } from '@podlove/player-actions/transcripts';
import { asyncAnimation } from '@podlove/utils/helper';
import select from '../../../store/selectors/index.js';

import TranscriptEntry from './Entry.vue';

const RENDER_BUFFER = 10;

const root = ref<HTMLElement | null>(null);

const props = defineProps<{
  prerender: number[]
}>();

const state = mapState({
  playtime: select.playtime,
  ghostActive: select.ghost.active,
  ghostTime: select.ghost.time,
  timeline: select.transcripts.timeline,
  active: select.transcripts.active,
  follow: select.transcripts.follow,
  searchResults: select.transcripts.searchResults,
  query: select.transcripts.searchQuery,
  selected: select.transcripts.searchSelected
});

const dispatch = injectStore().dispatch;

const start = ref(0);
const end = ref(0);


watch(() => state.active, () => {
  if (state.selected !== -1 || !state.follow) {
    return;
  }

  scrollWindow();
});

watch(() => state.follow, () => {
  scrollWindow();
});

watch(() => state.selected, () => {
  if (state.query.length === 0 || state.selected === -1) {
    return;
  }

  scrollTo(state.searchResults[state.selected - 1]);
});

onMounted(() => {
  // Render the transcripts
  renderWindow(state.active);

  // Scroll to the active transcript
  scrollTo(state.active);
});

// Methods
const onMouseOver = ({ start }) => {
  dispatch(enableGhost());
  dispatch(simulatePlaytime(start));
};

const onMouseLeave = () => {
  dispatch(disableGhost());
};

const onClick = ({ start }) => {
  dispatch(requestPlaytime(start));
  dispatch(requestPlay());
};

const disableFollow = () => {
  dispatch(followTranscripts(false));
};

const inRange = (index) => {
  if (index < 0) {
    return 0;
  }

  if (index >= props.prerender.length - 1) {
    return props.prerender.length - 1;
  }

  return index;
};

const indexByHeight = (search: number, index = 0, height = 0) => {
  if (search <= height) {
    return index - 1;
  }

  if (index < 0) {
    return 0;
  }

  if (index > props.prerender.length - 1) {
    return props.prerender.length - 1;
  }

  return indexByHeight(search, index + 1, height + props.prerender[index]);
};

const heightByIndex = (start = 0, end = -1): number => props.prerender.slice(start, end).reduce((result: number, element) => result + element, 0);

const slice = (start = 0, end = 0) => {
  // slice not includes the last end element, therefore + 1
  return state.timeline.slice(start, end + 1);
};

const renderWindow = (startIndex = -1) => {
  asyncAnimation().then(() => {
    let endIndex;

    if (startIndex === -1) {
      startIndex = indexByHeight(root.value.scrollTop);
      endIndex = indexByHeight(root.value.scrollTop + root.value.clientHeight);
    } else {
      endIndex = indexByHeight(heightByIndex(0, startIndex) + root.value.clientHeight);
    }

    start.value = inRange(startIndex - RENDER_BUFFER);
    end.value = inRange(endIndex + RENDER_BUFFER);
  });
};

const scrollWindow = () => {
  asyncAnimation().then(() => {
    // If transcript isn't in rendered slice, mostly initial or on scrub
    if (start.value > state.active || end.value < state.active) {
      scrollTo(state.active);
    }

    // Follow mode is off or ghost mode is on
    if (!state.follow || state.ghostActive) {
      return;
    }

    // Get the active element
    const activeNode: HTMLElement = root.value.querySelector('.active-transcript');

    if (!activeNode) {
      return;
    }

    // Header + buffer ~> 190px height
    const scrollPosition = activeNode.offsetTop - activeNode.clientHeight - 190;

    root.value.scroll && root.value.scroll({ behavior: 'smooth', top: scrollPosition });
  });
};

const scrollTo = (index) => {
  root.value.scroll && root.value.scroll({ top: heightByIndex(0, index) });
};
</script>

<style lang="postcss" scoped>

</style>
